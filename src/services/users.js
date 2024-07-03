const httpStatus = require("http-status");
const {
  Types: { ObjectId },
} = require("mongoose");

const { usersModel } = require("../models");

const getAllUsers = async () => {
  return await usersModel.find({});
};

module.exports = {
  getAllUsers,
};
