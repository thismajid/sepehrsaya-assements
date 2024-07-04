const express = require("express");

const apiDocs = require("./doc.route");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");

const router = express.Router();

router.use("/docs", apiDocs);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
