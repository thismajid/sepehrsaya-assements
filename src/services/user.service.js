const httpStatus = require("http-status");
const {
  Types: { ObjectId },
} = require("mongoose");

const { ApiError } = require("../utils");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(filter, pagination) {
    return this.userRepository.findAll(filter, pagination);
  }

  async getUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, `User with id: ${id} not found`);
    }
    return user;
  }

  async createUser(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, "User already exists");
    }
    return this.userRepository.create(userData);
  }
}

module.exports = UserService;
