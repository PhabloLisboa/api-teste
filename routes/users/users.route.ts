import * as restify from 'restify'
import {Router} from '../../common/router'

class UsersRouter extends Router{
    applyRoutes(application: restify.Server){
        application.get('/info', (req, res, next) => {
            res.json('Parabéns, Amigo!')
        })
    }    
}

export const usersRouter = new UsersRouter()