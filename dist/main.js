"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_route_1 = require("./routes/users/users.route");
const server = new server_1.Server();
server.bootstrap([users_route_1.usersRouter])
    .then(server => console.log(`Server on port:`, server.application.address().port))
    .catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
