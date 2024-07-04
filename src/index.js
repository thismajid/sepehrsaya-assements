const mongoose = require("mongoose");

const app = require("./app");
const { mainConfigs, logger } = require("./configs");
const { seedDb } = require("./utils");

let server;
const mongooseDebug = mainConfigs.env !== "production" ? true : false;
mongoose.set("debug", mongooseDebug);
mongoose.connect(mainConfigs.mongoose.uri).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(mainConfigs.port, () => {
    logger.info(`Server is running on: ${mainConfigs.realUrl}`);
    console.log(`Swagger is accessible on: ${mainConfigs.realUrl}/api/v1/docs`);
    seedDb();
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
