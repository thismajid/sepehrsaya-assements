const { UserModel } = require("../models");

class UserRepository {
  async findAll(query = {}, pagination = {}) {
    return await UserModel.paginate(query, pagination);
  }

  async findById(id) {
    return UserModel.findById(id);
  }

  async findByEmail(email) {
    return UserModel.findOne({ email });
  }

  async create(userData) {
    return UserModel.create(userData);
  }

  async deleteById(id) {
    return UserModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
