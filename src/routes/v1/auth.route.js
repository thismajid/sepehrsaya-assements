const express = require("express");

const { validate } = require("../../middlewares");
const { AuthValidation } = require("../../validations");
const { AuthController } = require("../../controllers");

const router = express.Router();

router
  .route("/login")
  .post(validate(AuthValidation.login), AuthController.login);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "admin@example.com"
 *               password: "superadminpassword99"
 *     responses:
 *       "200":
 *         description: OK
 */
