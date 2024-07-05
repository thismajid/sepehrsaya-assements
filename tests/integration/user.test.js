const request = require("supertest");
const { faker } = require("@faker-js/faker");
const httpStatus = require("http-status");

const app = require("../../src/app");
const setupTestDB = require("../setupTestDB");
const User = require("../../src/models/user.model");
const { seedDb } = require("../../src/utils");

setupTestDB();

describe("User routes", () => {
  let authToken, newUser, userOne, userTwo;

  beforeAll(async () => {
    await seedDb();
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "admin@example.com",
      password: "superadminpassword99",
    });

    authToken = res.body.data.token;
  });

  beforeEach(() => {
    newUser = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password133",
    };

    userOne = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password123",
    };

    userTwo = {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password: "password321",
    };
  });

  describe("POST /api/v1/users", () => {
    test("should return 201 and successfully create new user if data is ok", async () => {
      const res = await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.CREATED);

      const dbUser = await User.findById(res.body.data.id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(newUser.password);
      expect(dbUser).toMatchObject({
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: "user",
      });
    });

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalidEmail";

      await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already used", async () => {
      await User.create(newUser);

      await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "passwo1";

      await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password does not contain both letters and numbers", async () => {
      newUser.password = "password";

      await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = "1111111";

      await request(app)
        .post("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe("GET /api/v1/users", () => {
    test("should return 200 and apply the default query options", async () => {
      await User.insertMany([userOne, userTwo]);

      const res = await request(app)
        .get("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.data.docs).toHaveLength(2);
    });

    test("should correctly apply filter on firstName, lastName field", async () => {
      const createdUserOne = await User.create(userOne);
      const createdUserTwo = await User.create(userTwo);

      await request(app)
        .get("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .query({
          firstname: createdUserOne.firstname,
          lastname: createdUserTwo.lastname,
        })
        .send()
        .expect(httpStatus.OK);
    });

    test("should correctly apply filter on email field", async () => {
      await User.insertMany([userOne, userTwo]);

      await request(app)
        .get("/api/v1/users")
        .set("authorization", `Bearer ${authToken}`)
        .query({ email: userOne.email })
        .send()
        .expect(httpStatus.OK);
    });
  });

  describe("GET /api/v1/users/:userId", () => {
    test("should return 200 and the user object if data is ok", async () => {
      const createdUser = await User.create(userOne);

      const res = await request(app)
        .get(`/api/v1/users/${createdUser._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body.data).not.toHaveProperty("password");
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.data).toHaveProperty("firstname");
      expect(res.body.data).toHaveProperty("lastname");
      expect(res.body.data).toHaveProperty("role");
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await request(app)
        .get("/api/v1/users/invalidId")
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user is not found", async () => {
      await request(app)
        .get(`/v1/users/6686c0c7b91e987be10f0dc3`)
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("DELETE /api/v1/users/:userId", () => {
    test("should return 200 if data is ok", async () => {
      const createUser = await User.create(userOne);

      await request(app)
        .delete(`/api/v1/users/${createUser._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.OK);

      const dbUser = await User.findById(createUser._id);
      expect(dbUser).toBeNull();
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      await request(app)
        .delete("/api/v1/users/invalidId")
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 404 error if user already is not found", async () => {
      await request(app)
        .delete(`/api/v1/users/6686c0c7b91e987be10f0dc3`)
        .set("authorization", `Bearer ${authToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });

  describe("PUT /api/v1/users/:userId", () => {
    test("should return 200 and successfully update user if data is ok", async () => {
      const createdUser = await User.create(userOne);
      const updateBody = {
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: faker.internet.password(),
      };

      const res = await request(app)
        .put(`/api/v1/users/${createdUser._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty("password");
      expect(res.body.data).toEqual({
        id: userOne._id.toHexString(),
        firstname: updateBody.firstname,
        lastname: updateBody.lastname,
        email: updateBody.email,
        role: "user",
      });

      const dbUser = await User.findById(userOne._id);
      expect(dbUser).toBeDefined();
      expect(dbUser.password).not.toBe(updateBody.password);
    });

    test("should return 200 and successfully update user", async () => {
      const createdUser = await User.create(userOne);
      const updateBody = { firstname: faker.person.firstName() };

      await request(app)
        .put(`/api/v1/users/${createdUser._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.OK);
    });

    test("should return 404 if updating another user that is not found", async () => {
      const updateBody = { firstname: faker.person.firstName() };

      const res = await request(app)
        .put(`/api/v1/users/6686c0c7b91e987be10f0dc3`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody);
    });

    test("should return 400 error if userId is not a valid mongo id", async () => {
      const updateBody = { firstname: faker.person.firstName() };

      await request(app)
        .put(`/api/v1/users/invalidId`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if email is invalid", async () => {
      const createdUser = await User.create(userOne);
      const updateBody = { email: "invalidEmail" };

      await request(app)
        .put(`/api/v1/users/${createdUser._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if email is already taken", async () => {
      const createdUserOne = await User.create(userOne);
      const createdUserTwo = await User.create(userTwo);

      const updateBody = { email: createdUserTwo.email };

      await request(app)
        .put(`/api/v1/users/${createdUserOne._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if password length is less than 8 characters", async () => {
      const createdUserOne = await User.create(userOne);
      const updateBody = { password: "passwo1" };

      await request(app)
        .put(`/api/v1/users/${createdUserOne._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 if password does not contain both letters and numbers", async () => {
      const createdUserOne = await User.create(userOne);

      const updateBody = { password: "password" };

      const res = await request(app)
        .put(`/api/v1/users/${createdUserOne._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody);

      console.log("ressssssssssssssssss", res);

      updateBody.password = "11111111";

      await request(app)
        .put(`/api/v1/users/${createdUserOne._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .send(updateBody)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
