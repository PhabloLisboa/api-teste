"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_route_1 = require("./routes/users/users.route");
const restaurants_route_1 = require("./routes/restaurants/restaurants.route");
const reviews_route_1 = require("./routes/reviews/reviews.route");
const index_route_1 = require("./routes/index/index.route");
const server = new server_1.Server();
server.bootstrap([index_route_1.indexRouter, users_route_1.usersRouter, restaurants_route_1.restaurantsRouter, reviews_route_1.reviewsRouter])
    .then(server => console.log(`Server on port:`, server.application.address().port))
    .catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
