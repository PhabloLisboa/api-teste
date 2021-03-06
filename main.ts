import { Server } from './server/server'
import { usersRouter } from './routes/users/users.route'
import { restaurantsRouter } from './routes/restaurants/restaurants.route'
import { reviewsRouter } from './routes/reviews/reviews.route'
import { indexRouter } from './routes/index/index.route'


const server = new Server()

server.bootstrap([indexRouter, usersRouter, restaurantsRouter, reviewsRouter])
    .then( server => console.log( `Server on port:`,server.application.address().port))
    .catch( error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
    })


