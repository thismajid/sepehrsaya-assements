const express = require("express");

const { validate } = require("../../middlewares");
const { UserValidation } = require("../../validations");
const { UserController } = require("../../controllers");

const router = express.Router();

router
  .route("/")
  .get(validate(UserValidation.getAllUsers), UserController.getAllUsers)
  .post(validate(UserValidation.createUser), UserController.createUser);

router
  .route("/:id")
  .get(validate(UserValidation.getEachUser), UserController.getUser)
  .put(validate(UserValidation.updateUser), UserController.updateUser)
  .delete(validate(UserValidation.getEachUser), UserController.deleteUser);

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
 *         name: firstname
 *         required: false
 *         schema:
 *           type: string
 *         description: Firstname filter
 *       - in: query
 *         name: lastname
 *         required: false
 *         schema:
 *           type: string
 *         description: Lastname filter
 *       - in: query
 *         name: email
 *         required: false
 *         schema:
 *           type: string
 *         description: Email filter
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of docs
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get each user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               firstname: firstname
 *               lastname: lastname
 *               email: unique_email@email.com
 *               password: strong123password
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update exist user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               firstname: firstname
 *               lastname: lastname
 *               email: unique_email@email.com
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete each user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 */
