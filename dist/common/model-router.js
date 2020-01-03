"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (req, resp, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Document not found'));
            }
            else {
                next();
            }
        };
        this.findAll = (req, resp, next) => {
            this.model.find().then(this.renderAll(resp, next)).catch(next);
        };
        this.findById = (req, res, next) => {
            this.model.findById(req.params.id).then(this.render(res, next)).catch(next);
        };
        this.save = (req, res, next) => {
            let document = new this.model(req.body);
            document.save().then(this.render(res, next)).catch(next);
        };
        this.replace = (req, res, next) => {
            const options = { runValidators: true, overwrite: true };
            this.model.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return this.model.findById(req.params.id);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento Não Encontrado');
                }
            }).then(this.render(res, next)).catch(next);
        };
        this.update = (req, res, next) => {
            const options = { runValidators: true, new: true };
            this.model.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(res, next)).catch(next);
        };
        this.delete = (req, res, next) => {
            this.model.remove({ _id: req.params.id })
                .exec()
                .then((result) => {
                if (result.n) {
                    res.send(204);
                }
                else {
                    throw new restify_errors_1.NotFoundError('Documento Não Encontrado');
                }
                return next();
            }).catch(next);
        };
        this.basePath = `/${this.model.collection.name}`;
    }
    envelope(document) {
        let resource = Object.assign({ _links: {} }, document.toJSON());
        resource._links.self = `${this.basePath}/${resource._id}`;
        return resource;
    }
}
exports.ModelRouter = ModelRouter;
