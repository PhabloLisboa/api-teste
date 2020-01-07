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
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options = {}) {
        return documents;
    }
    render(resp, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                resp.json(this.envelope(document));
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento Não Encontrado');
            }
            return next(false);
        };
    }
    renderAll(resp, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRnder', document);
                    array[index] = this.envelope(document);
                });
                resp.json(this.envelopeAll(documents, options));
            }
            else {
                resp.json([]);
            }
            return next(false);
        };
    }
}
exports.Router = Router;
