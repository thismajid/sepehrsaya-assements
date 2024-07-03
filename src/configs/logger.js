const winston = require("winston");
const mainConfigs = require("./main");

function createEnumerateErrorFormat() {
  return winston.format((info) => {
    if (info instanceof Error) {
      Object.assign(info, { message: info.stack });
    }
    return info;
  });
}

function createLogger(config) {
  const enumerateErrorFormat = createEnumerateErrorFormat();

  return winston.createLogger({
    level: config.env === "development" ? "debug" : "info",
    format: winston.format.combine(
      enumerateErrorFormat(),
      config.env === "development"
        ? winston.format.colorize()
        : winston.format.uncolorize(),
      winston.format.splat(),
      winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
      new winston.transports.Console({
        stderrLevels: ["error"],
      }),
    ],
  });
}

const logger = createLogger(mainConfigs);

module.exports = logger;
