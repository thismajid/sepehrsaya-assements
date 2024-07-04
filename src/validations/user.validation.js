const Joi = require("joi");

// Custom Joi extension for ObjectId validation
const objectId = Joi.extend((joi) => ({
  type: "objectId",
  base: joi.string(),
  messages: {
    "objectId.invalid": "{{#label}} must be a valid ObjectId",
  },
  validate(value, helpers) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return { value, errors: helpers.error("objectId.invalid") };
    }
  },
}));

// Reusable schemas
const schemas = {
  pagination: {
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
  },

  objectId: objectId.objectId().required(),

  user: {
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(6),
  },

  optionalUsers: {
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
  },
};

const validations = {
  optionalUsers: {
    query: Joi.object({
      ...schemas.pagination,
      ...schemas.getAllUsers,
    }),
  },

  getEachUser: {
    params: Joi.object({
      id: schemas.objectId,
    }),
  },

  createUser: {
    body: Joi.object({
      ...schemas.user,
    }),
  },

  updateUser: {
    params: Joi.object({
      id: schemas.objectId,
    }),
    body: Joi.object({
      ...schemas.optionalUsers,
    }),
  },
};

module.exports = validations;
