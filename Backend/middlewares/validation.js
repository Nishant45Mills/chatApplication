const joi = require('joi');
const ApiError = require('../util/ApiError');

const validation = (schema) => (req, res, next) => {

    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }
    next();
}

module.exports = validation;