const { version } = require("../../package.json");
const { mainConfigs } = require("../configs");

const servers = [
  {
    url: `${mainConfigs.realUrl}/api/v1`,
  },
  {
    url: `http://localhost:${mainConfigs.port}/api/v1`,
  },
];

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Sepehr Saya Assessments API",
    version,
  },
  servers,
};

module.exports = swaggerDef;
