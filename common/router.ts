
import * as restify from 'restify'
import { EventEmitter } from 'events'

export abstract class Router extends EventEmitter{

    constructor(){
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    abstract applyRoutes(application: restify.Server)

    render(resp: restify.Response, next){
        return (document) => {
            if(document){
                this.emit('beforeRender', document)
                resp.json(document)
            }else{
                resp.send(404)
            }
            return next()
        }
    }
}