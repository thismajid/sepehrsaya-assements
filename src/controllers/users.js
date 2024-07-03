const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { usersService } = require("../services");

const getAllUsers = catchAsync(async (req, res, next) => {
  const results = await usersService.getAllUsers({ ...req.query });

  res.sendResponse(httpStatus.OK, { ...results });
});

module.exports = {
  getAllUsers,
};
