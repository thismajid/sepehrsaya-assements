const Joi = require("joi");

const validations = {
  login: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};

module.exports = validations;
