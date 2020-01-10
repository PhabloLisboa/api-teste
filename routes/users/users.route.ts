import * as restify from 'restify'
import {ModelRouter} from '../../common/model-router'
import { User } from '../../users/users.model'
import { authenticate } from '../../security/auth.handler'



class UsersRouter extends ModelRouter<User>{
    constructor(){
        super(User)
    }
    applyRoutes(application: restify.Server){

        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validateId,this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateId, this.update])
        application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
        application.post(`${this.basePath}/authenticate`, authenticate)
    }    
}

export const usersRouter = new UsersRouter()