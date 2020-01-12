import * as restify from 'restify'
import {environment} from './../common/environment'
import { Router } from '../common/router'
import * as mongoose from 'mongoose'
import {mergePatchBodyParser} from './merge-patch.parser'
import {handleError} from './errorHandler'
import { tokenParser } from '../security/token.parser'

import * as fs from 'fs'
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

                this.application = restify.createServer({
                    name: 'Teste API',
                    version: '1.0.0',
                    certificate: fs.readFileSync('./security/keys/cert.pem'),
                    key: fs.readFileSync('./security/keys/key.pem')

                })

                for( let router of routers){
                    router.applyRoutes(this.application)
                }
                
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)

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