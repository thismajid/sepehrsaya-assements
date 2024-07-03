const express = require("express");

const apiDocs = require("./docs");
const usersRoute = require("./users");

const router = express.Router();

router.use("/docs", apiDocs);
router.use("/users", usersRoute);

module.exports = router;
