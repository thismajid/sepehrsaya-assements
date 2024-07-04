const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const {
  Types: { ObjectId },
} = require("mongoose");

const { ApiError } = require("../utils");
const { mainConfigs } = require("../configs");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async loginUserWithEmailAndPassword({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Incorrect email or password"
      );
    }
    return user;
  }

  async generateAuthTokens(user) {
    const accessTokenExpires = moment().add(
      mainConfigs.jwt.accessExpirationMinutes,
      "minutes"
    );
    const accessToken = await this.generateToken(user.id, accessTokenExpires);

    return {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    };
  }

  async generateToken(userId, expires, secret = mainConfigs.jwt.secret) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type: "access",
    };
    return jwt.sign(payload, secret);
  }
}

module.exports = AuthService;
