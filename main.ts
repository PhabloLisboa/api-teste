import { Server } from './server/server'
import { usersRouter } from './routes/users/users.route'


const server = new Server()

server.bootstrap([usersRouter])
    .then( server => console.log( `Server on port:`,server.application.address().port))
    .catch( error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
    })


