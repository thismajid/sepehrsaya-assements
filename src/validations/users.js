const Joi = require("joi");

const pagination = {
  page: Joi.number().integer().default(1).optional(),
  limit: Joi.number().integer().default(10).optional(),
};

const getAllUsers = {
  query: Joi.object().keys({
    ...pagination,
  }),
};

module.exports = {
  getAllUsers,
};
