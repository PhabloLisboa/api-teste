"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const router_1 = require("../../common/router");
class indexRoute extends router_1.Router {
    constructor() {
        super();
        this.collections = [];
        this.links = {};
        this.getAllCollections = (names) => {
            names.forEach(item => { this.collections.push(item.name); });
            return this.collections;
        };
        this.getAllLinks = (collections) => {
            collections.forEach(item => {
                this.links[item] = `/${item}`;
            });
            return this.links;
        };
        this.linksToRender = (req, resp, next) => {
            mongoose.connection.db.listCollections()
                .toArray((err, names) => resp.json(this.getAllLinks(this.getAllCollections(names))));
            return next();
        };
    }
    applyRoutes(application) {
        application.get('/', this.linksToRender);
    }
}
exports.indexRouter = new indexRoute();
