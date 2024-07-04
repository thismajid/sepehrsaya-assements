const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const { mainConfigs } = require("../configs");
const { UserRepository } = require("../repositories");

const userRepository = new UserRepository();

module.exports = () => async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "No authorization token");
  }

  if (!req.headers.authorization.split("Bearer ")[1]) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "No authorization token");
  }

  const jwtToken = req.headers.authorization.split("Bearer ")[1];

  try {
    jwt.verify(jwtToken, mainConfigs.jwt.secret);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Jwt expire time error");
    }
  }

  const foundAdmin = await userRepository.findAdmin();

  if (!foundAdmin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Admin not found");
  }

  next();
};
