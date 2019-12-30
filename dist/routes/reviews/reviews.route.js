"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../../common/model-router");
const reviwes_model_1 = require("../../reviews/reviwes.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviwes_model_1.Review);
        this.findById = (req, res, next) => {
            this.model.findById(req.params.id)
                .populate('user', 'name')
                .populate('restaurant')
                .then(this.render(res, next))
                .catch(next);
        };
    }
    applyRoutes(application) {
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();