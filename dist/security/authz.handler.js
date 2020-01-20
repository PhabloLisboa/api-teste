"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = require("restify-errors");
exports.authorize = (...profiles) => {
    return (req, resp, next) => {
        if (req.authenticated !== undefined && req.authenticated.hasAny(...profiles)) {
            req.log.debug('User %s is authorized whith profiles %j on route %s. Required Profiles: %j', req.authenticated._id, req.authenticated.profiles, req.path(), profiles);
            next();
        }
        else {
            if (req.authenticated) {
                req.log.debug('Permission denied %s. Required profiles %j. User profiles: %j', req.authenticated._id, profiles, req.authenticated.profiles);
            }
            next(new restify_errors_1.ForbiddenError('Permission denied'));
        }
    };
};