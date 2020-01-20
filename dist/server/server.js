"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("./../common/environment");
const mongoose = require("mongoose");
const merge_patch_parser_1 = require("./merge-patch.parser");
const errorHandler_1 = require("./errorHandler");
const token_parser_1 = require("../security/token.parser");
const corsMiddleware = require("restify-cors-middleware");
const fs = require("fs");
const logger_1 = require("../common/logger");
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
                const options = {
                    name: 'Teste API',
                    version: '1.0.0',
                    log: logger_1.logger
                };
                if (environment_1.environment.security.enableHTTPS) {
                    options.certificate = fs.readFileSync(environment_1.environment.security.certificate),
                        options.key = fs.readFileSync(environment_1.environment.security.key);
                }
                this.application = restify.createServer(options);
                const corsOptions = {
                    preflightMaxAge: 10,
                    origins: ['*'],
                    allowHeaders: ['authorization'],
                    exposeHeaders: ['x-custom-header']
                };
                const cors = corsMiddleware(corsOptions);
                this.application.pre(cors.preflight);
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.use(cors.actual);
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                this.application.pre(restify.plugins.requestLogger({ log: logger_1.logger }));
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', errorHandler_1.handleError);
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
