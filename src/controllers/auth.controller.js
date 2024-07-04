const httpStatus = require("http-status");

const { catchAsync } = require("../utils");
const { AuthService } = require("../services");
const { UserRepository } = require("../repositories");

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login = catchAsync(async (req, res) => {
    const user = await this.authService.loginUserWithEmailAndPassword(req.body);
    const token = await this.authService.generateAuthTokens(user);
    res.sendResponse(httpStatus.OK, { ...token });
  });
}

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

module.exports = authController;
