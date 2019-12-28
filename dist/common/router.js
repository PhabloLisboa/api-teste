"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const restify_errors_1 = require("restify-errors");
class Router extends events_1.EventEmitter {
    constructor() {
        super();
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    render(resp, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                resp.json(document);
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento Não Encontrado');
            }
            return next();
        };
    }
    renderAll(resp, next) {
        return (documents) => {
            if (documents) {
                documents.forEach(document => {
                    this.emit('beforeRnder', document);
                });
                resp.json(documents);
            }
            else {
                resp.json([]);
            }
        };
    }
}
exports.Router = Router;
