"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("./../common/environment");
const mongoose = require("mongoose");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initializeDb() {
        return mongoose.connect(environment_1.environment.db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => console.log('DB initialized'));
    }
    initRoutes(routers = []) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'Teste API',
                    version: '1.0.0'
                });
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
