const express = require("express");

const { validate } = require("../../middlewares");
const { usersValidation } = require("../../validations");
const { usersController } = require("../../controllers");

const router = express.Router();

router.get(
  "/",
  validate(usersValidation.getAllUsers),
  usersController.getAllUsers
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users crud
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 */
