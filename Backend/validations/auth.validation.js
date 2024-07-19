const joi = require('joi');

const register = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')).required()
});

const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().max(20).required()
});

module.exports = { register, login }