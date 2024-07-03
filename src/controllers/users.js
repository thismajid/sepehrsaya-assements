const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { usersService } = require("../services");

const getAllUsers = catchAsync(async (req, res, next) => {
  const results = await usersService.getAllUsers({ ...req.query });

  res.sendResponse(httpStatus.OK, { ...results });
});

const getEachUser = catchAsync(async (req, res, next) => {
  await usersService.isExistUser({ ...req.params });
  const result = await usersService.getEachUser({
    ...req.params,
  });

  res.sendResponse(httpStatus.OK, { ...result });
});

module.exports = {
  getAllUsers,
  getEachUser,
};
