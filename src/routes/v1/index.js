const express = require("express");

const apiDocs = require("./doc.route");
const userRoutes = require("./user.route");

const router = express.Router();

router.use("/docs", apiDocs);
router.use("/users", userRoutes);

module.exports = router;
