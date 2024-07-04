const { UserRepository } = require("../repositories");

const userRepository = new UserRepository();

module.exports = async () => {
  try {
    const adminExist = await userRepository.findAdmin();

    if (!adminExist) {
      await userRepository.create({
        firstname: "admin",
        lastname: "admin",
        password: "superadminpassword99",
        email: "admin@example.com",
        role: "admin",
      });
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error(error);
  }
};
