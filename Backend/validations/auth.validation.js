const joi = require("joi");

const register = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().max(20).required(),
});

module.exports = { register, login };
