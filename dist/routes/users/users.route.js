"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../common/router");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/info', (req, res, next) => {
            res.json('Parabéns, Amigo!');
        });
    }
}
exports.usersRouter = new UsersRouter();
