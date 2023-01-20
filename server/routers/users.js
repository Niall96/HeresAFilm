const { Router } = require("express");
const { check, body } = require("express-validator");
const { validateUtils } = require("../utils");
const { UsersController } = require("../controllers");

const Users = Router();
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users items with the name and key
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "email_address": "user@email.com","username": "niall", "date_of_birth": "0000-00-00" }, { "id": 2,  "email_address": "user@email.com","user_name": "tom", "date_of_birth": "0000-00-00" }]'
 *       204:
 *         description: No content
 */
Users.get("/", UsersController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: returns a specified user
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,  "email_address": "user@email.com","username": "niall", "date_of_birth": "0000-00-00" }'
 *       204:
 *         description: No content
 */
Users.get("/:id(\\d+)", UsersController.getById);

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: returns a specified user
 *     parameters:
 *       - name: username
 *         in: path
 *         type: string
 *         description: The username of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "id": 1,  "email_address": "user@email.com","username": "niall", "date_of_birth": "0000-00-00" }'
 *       204:
 *         description: No content
 */
Users.get("/username(\\g)", UsersController.getByUsername);

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user with the name and key
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_address:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *                 example: example@email.com
 *               username:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *                 example: username
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *                 example: password!1
 *               date_of_birth:
 *                 type: string
 *                 required: true
 *                 description: The date of birth of the user
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "email_address": "user@email.com","username": "niall","password": "Password1", "date_of_birth": "0000-00-00" }'
 *       204:
 *         description: No content
 */
Users.post(
  "/",
  [
    body("email_address")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    body("username")
      .isString()
      .isLength({ min: 6 })
      .withMessage("the username must have minimum length of 6")
      .trim(),
    body("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
    body("date_of_birth").exists(),
  ],
  validateUtils.validate,
  (req, res) => {
    const { email_address, username, password, date_of_birth } = req.body;
    res.sendStatus(201);
  }
);
/**
 * @swagger
 * /users:
 *   delete:
 *     tags: [
 *       users
 *     ]
 *     summary: Delete user from application
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: Delete the user by their id.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *
 *       204:
 *         description: No content
 */
Users.delete("/:id(\\d+)", UsersController.deleteUser);
/**
 * @swagger
 * /users/{id}/reviews:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users reviews
 *     parameters:
 *      - name: id
 *        in: path
 *        type: integer
 *        description: The ID of the requested user.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '["user_id": 1, "film_id": 2, "rating": 5.3, "description": "Such a meh film" }, { "user_id": 1, "film_id": 2, "rating": 5.3, "description": "Such a meh film" }]'
 *       204:
 *         description: No content
 */
Users.get("/:id(\\d+)/reviews", function (req, res) {
  const { id } = req.query;
  res.status(200).json([
    {
      id: 1,
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
    {
      id: 2,
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

/**
 * @swagger
 * /users/{id}/films:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns list of films by specified status
 *     operationId: films
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Is the film considered a favourite
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *           default: watched
 *           enum:
 *             - watched
 *             - watchlist
 *             - favorite
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
Users.get("/:id(\\d+)/films", function (req, res) {
  const { user_id, status } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      status: 2,
    },
    {
      film_id: 5,
      status: 1,
    },
  ]);
});

/**
 * @swagger
 *components:
 *         schemas:
 *           films:
 *             description: List of Films
 *             type: object
 *             properties:
 *               film_id:
 *                 type: integer
 *               status:
 *                 type: integer
 *             example:
 *                 - film_id: 1
 *                   status: 2
 *                 - film_id: 2
 *                   status: 1
 * /users/{id}/films:
 *   patch:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates User Films list
 *     operationId: films
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The id of the requested user.
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               films:
 *                 type: array
 *                 required: true
 *                 items:
 *                   $ref: '#/components/schemas/films'
 *                 example:
 *                     - film_id: 2
 *                       status: 3
 *                     - film_id: 100
 *                       status: 2
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "film_id": 1, "status": 2 }, {"film_id": 6, "status": 3 }]'
 *       204:
 *         description: No content
 */
Users.patch(
  "//:id(\\d+)",
  [check("film_id").isNumeric, check("status").isNumeric],
  validateUtils.validate,
  (req, res) => {
    const { film_id, status } = req.body;
    console.log("film_id:", film_id, "status:", status);
    res.sendStatus(201);
  }
);

module.exports = Users;
