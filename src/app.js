const express = require("express");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const xssShield = require("xss-shield");
const httpStatus = require("http-status");

const { mainConfigs, morgan } = require("./configs");
const { errorConverter, errorHandler } = require("./middlewares");
const { ApiError, response } = require("./utils");
const routes = require("./routes/v1");

const app = express();

app.use(cors("*"));

if (mainConfigs.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Add the response wrapper middleware
app.use(response);

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(expressMongoSanitize());

// prevent xss
app.use(xssShield());

// gzip compression
app.use(compression());

// v1 api routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
