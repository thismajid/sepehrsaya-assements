const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { UserService } = require("../services");
const { UserRepository } = require("../repositories");

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getAllUsers = catchAsync(async (req, res) => {
    const results = await this.userService.getAllUsers(req.query);
    res.sendResponse(httpStatus.OK, { ...results });
  });

  getUser = catchAsync(async (req, res) => {
    const result = await this.userService.getUser(req.params.id);
    res.sendResponse(httpStatus.OK, result);
  });

  createUser = catchAsync(async (req, res) => {
    await this.userService.createUser(req.body);
    res.sendResponse(httpStatus.CREATED, {});
  });

  updateUser = catchAsync(async (req, res) => {
    await this.userService.updateUser(req.params.id, req.body);
    res.sendResponse(httpStatus.OK, {});
  });

  deleteUser = catchAsync(async (req, res) => {
    await this.userService.deleteUser(req.params.id);
    res.sendResponse(httpStatus.OK, {});
  });
}

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

module.exports = userController;
