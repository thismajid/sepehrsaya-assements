const mongoose = require("mongoose");

const mainConfigs = require("../src/configs/main");

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(mainConfigs.mongoose.uri);
  });

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;
