const request = require("supertest");
const httpStatus = require("http-status");

const app = require("../../src/app");
const setupTestDB = require("../setupTestDB");
const { seedDb } = require("../../src/utils");

setupTestDB();
seedDb();

describe("Auth routes", () => {
  describe("POST /api/v1/auth/login", () => {
    test("should return 200 and successfully logged in", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "admin@example.com",
          password: "superadminpassword99",
        })
        .expect(httpStatus.OK);

      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data).toHaveProperty("expires");
    });

    test("should return 401", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "admin@example.com",
          password: "invalidpassword",
        })
        .expect(httpStatus.UNAUTHORIZED);
    });

    test("should return 401", async () => {
      await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "invalid@example.com",
          password: "superadminpassword99",
        })
        .expect(httpStatus.UNAUTHORIZED);
    });
  });
});
