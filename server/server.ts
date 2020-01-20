import * as restify from 'restify'
import {environment} from './../common/environment'
import { Router } from '../common/router'
import * as mongoose from 'mongoose'
import {mergePatchBodyParser} from './merge-patch.parser'
import {handleError} from './errorHandler'
import { tokenParser } from '../security/token.parser'
import * as corsMiddleware from 'restify-cors-middleware'

import * as fs from 'fs'
import { logger } from '../common/logger'
export class Server{

    application: restify.Server

    initializeDb(){
        return mongoose.connect(environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },() => console.log('DB initialized'))
    }

    initRoutes(routers: Router[] = []): Promise<any>{
        return new Promise((resolve,reject) => {
            try{

                const options: restify.ServerOptions = {
                    name: 'Teste API',
                    version: '1.0.0',
                    log: logger
                }

                if(environment.security.enableHTTPS){
                    options.certificate = fs.readFileSync(environment.security.certificate),
                    options.key = fs.readFileSync(environment.security.key)
                }

                this.application = restify.createServer(options)

                const corsOptions: corsMiddleware.Options = {
                    preflightMaxAge: 10,
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                }

                const cors: corsMiddleware.CorsMiddleware = corsMiddleware(corsOptions)

                this.application.pre(cors.preflight)

                for( let router of routers){
                    router.applyRoutes(this.application)
                }
                
                this.application.use(cors.actual)
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)
                this.application.pre(restify.plugins.requestLogger({ log: logger}))

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handleError)

            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(() => 
            this.initRoutes(routers).then(() => this)
        )
    }
}