import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { Router } from '../../common/router';

class indexRoute extends Router{
    constructor(){
        super()
    }
    collections: any[] = []
    links: {} = {}

    getAllCollections = (names: any) => {
        names.forEach(item => {this.collections.push(item.name)})
        return this.collections
    }

    getAllLinks = (collections: string[]) =>{
        collections.forEach( item => {
            this.links[item] = `/${item}`
        })

        return this.links
    }

    linksToRender = (req, resp, next) => {
        mongoose.connection.db.listCollections()
        .toArray((err, names) => resp.json(this.getAllLinks(this.getAllCollections(names))))        
        return next()
    }

    applyRoutes(application: restify.Server){
        application.get('/', this.linksToRender)
    }

}


export const indexRouter = new indexRoute()