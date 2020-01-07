
import * as restify from 'restify'
import { EventEmitter } from 'events'
import { NotFoundError } from 'restify-errors'
import { response } from 'spdy'

export abstract class Router extends EventEmitter{

    constructor(){
        super()
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    abstract applyRoutes(application: restify.Server)

    envelope(document: any): any {
        return document
    }

    envelopeAll(documents: any[], options: any = {}): any {
       return documents
    }

    render(resp: restify.Response, next){
        return (document) => {
            if(document){
                this.emit('beforeRender', document)
                resp.json(this.envelope(document))
            }else{
                throw new NotFoundError('Documento Não Encontrado')
            }
            return next(false)
        }
    }

    renderAll(resp: restify.Response, next, options: any = {}){
        return(documents: any[]) => {
            if(documents){
                documents.forEach((document, index, array) => {
                    this.emit('beforeRnder', document)
                    array[index] = this.envelope(document)
                })
                resp.json(this.envelopeAll(documents, options))
            }else{
                resp.json([])
            }
            return next(false)
        }
    }
}