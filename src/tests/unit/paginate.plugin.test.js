const { faker } = require("@faker-js/faker");

const setupTestDB = require("../setupTestDB");
const User = require("../../models/user.model");

setupTestDB();

describe("paginate plugin", () => {
  describe("populate option", () => {
    test("should populate the specified data fields", async () => {
      const user = await User.create({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: "password133",
        role: "user",
      });

      const usersPages = await User.paginate(
        { _id: user._id },
        { page: 1, limit: 10 }
      );

      expect(usersPages).toHaveProperty("docs");
      expect(usersPages).toHaveProperty("meta");
      expect(usersPages.docs[0]).toHaveProperty("_id");
      expect(usersPages.meta).toHaveProperty("totalDocs");
      expect(usersPages.meta).toHaveProperty("totalPages");
      expect(usersPages.meta).toHaveProperty("hasNextPage");
      expect(usersPages.meta).toHaveProperty("hasPrevPage");
      expect(usersPages.meta).toHaveProperty("page");
      expect(usersPages.meta).toHaveProperty("limit");
    });
  });
});
