const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = require("../../docs/swaggerDef");

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition: swaggerDefinition,
  apis: ["src/docs/components.yml", "src/routes/v1/*.js"],
});
const swaggerHtmlV1 = swaggerUi.generateHTML(specs, {});
router.use("/", swaggerUi.serveFiles(specs, {}));
router.get("/", (req, res) => {
  res.send(swaggerHtmlV1);
});

module.exports = router;
