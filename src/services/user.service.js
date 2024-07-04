const httpStatus = require("http-status");
const {
  Types: { ObjectId },
} = require("mongoose");

const { ApiError } = require("../utils");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers({ firstname, lastname, email, page = 1, limit = 10 }) {
    const filter = {
      ...(firstname && { firstname: { $regex: new RegExp(firstname, "i") } }),
      ...(lastname && { lastname: { $regex: new RegExp(lastname, "i") } }),
      ...(email && { email: { $regex: new RegExp(email, "i") } }),
    };
    const pagination = { page, limit };
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

  async updateUser(id, userData) {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, `User with id: ${id} not found`);
    }
    const existingUserWithEmail = await this.userRepository.findByEmail(
      userData.email
    );
    if (existingUserWithEmail && existingUserWithEmail.id.toString() !== id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return await this.userRepository.update(id, userData);
  }

  async deleteUser(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, `User with id: ${id} not found`);
    }
    await this.userRepository.deleteById(id);
  }
}

module.exports = UserService;
