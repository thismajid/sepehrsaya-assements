const httpStatus = require("http-status");
const {
  Types: { ObjectId },
} = require("mongoose");

const { usersModel } = require("../models");

const getAllUsers = async () => {
  return await usersModel.find({});
};

const getEachUser = async (id) => {
  return await usersModel.findOne({
    _id: new ObjectId(id),
  });
};

const isExistUser = async (id) => {
  const userFound = await getEachBlog(id);
  if (!userFound) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `User with id: ${slug} id not found`
    );
  }
};

module.exports = {
  getAllUsers,
  getEachUser,
  isExistUser,
};
