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

const getEachUser = {
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/, "ObjectId")
      .message(`Id must be an ObjectId`),
  }),
};

module.exports = {
  getAllUsers,
  getEachUser,
};
