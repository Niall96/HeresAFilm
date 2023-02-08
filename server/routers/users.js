const { Router } = require("express");
const { body, check } = require("express-validator");
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
 * /users/{emailAddress}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: returns a specified user
 *     parameters:
 *       - name: emailAddress
 *         in: path
 *         type: string
 *         description: The email address of the user.
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
Users.get("/:emailAddress", UsersController.getUserByEmail);

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
 *               emailAddress:
 *                 type: string
 *                 required: true
 *                 description: The email for the user
 *                 example: rooneyniall@rocketmail.com
 *               username:
 *                 type: string
 *                 required: true
 *                 description: The username for the user
 *                 example: UserNiall
 *               password:
 *                 type: string
 *                 required: true
 *                 description: The password for the user
 *                 example: Password12!
 *               dateOfBirth:
 *                 type: string
 *                 format: date-time
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
 *                 value: '{ "email_address": "user@email.com","username": "niall","user_password": "Password1", "date_of_birth": "0000-00-00" }'
 *       204:
 *         description: No content
 */
Users.post(
  "/",
  // [
  //   check("username")
  //     .isLength({ min: 3 })
  //     .withMessage("the name must have minimum length of 3")
  //     .trim(),
  //   check("password")
  //     .isLength({ min: 8, max: 15 })
  //     .withMessage("your password should have min and max length between 8-15")
  //     .matches(/\d/)
  //     .withMessage("your password should have at least one number")
  //     .matches(/[!@#$%^&*(),.?":{}|<>]/)
  //     .withMessage("your password should have at least one special character"),
  //   check("emailAddress")
  //     .isLength({ min: 4 })
  //     .withMessage("the email address must be 4 letters longer")
  //     .trim(),
  // ],
  // validateUtils.validate,
  UsersController.createUser
);
/**
 * @swagger
 * /users:
 *   put:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates an user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailAddress:
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
 *               dateOfBirth:
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
 *                 value: '{ "email_address": "user@email.com","username": "niall","user_password": "Password1", "date_of_birth": "0000-00-00" }'
 *       204:
 *         description: No content
 */
Users.put(
  "/",
  [
    body("emailAddress")
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
    body("dateOfBirth").exists(),
  ],
  validateUtils.validate,
  UsersController.updateUser
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
Users.get("/:id(\\d+)/reviews", UsersController.getUserReviews);

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
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested user.
 *       - name: favorites
 *         in: query
 *         description: Is the film considered a favourite
 *         required: false
 *         explode: true
 *         schema:
 *           type: boolean
 *       - name: watched
 *         in: query
 *         description: Has the film been watched by the user
 *         required: false
 *         explode: true
 *         schema:
 *           type: boolean
 *       - name: watchlist
 *         in: query
 *         description: Is the user gonna watch this film
 *         required: false
 *         explode: true
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "user_id": 1, "film" : [{"film_id": 1, "status": 1 },{"film_id": 1, "status": 1 }]}'
 *       204:
 *         description: No content
 */
Users.get("/:id(\\d+)/films", UsersController.getUserFilms);
/**
 * @swagger
 * /users/films:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new film for a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: int
 *                 required: true
 *                 description: The user id
 *                 example: 1
 *               filmId:
 *                 type: string
 *                 required: true
 *                 description: The film id
 *                 example: 1
 *               watched:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film has been watched by the user
 *                 example: true
 *               watchlist:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film is on the user's watchlist
 *                 example: true
 *               favorites:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film is a favourite film of the user
 *                 example: true
 *     responses:
 *       201:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "user_id": 1,"film_id": 1,"watched": true, "watchlist": false, "favorite": true }'
 *       204:
 *         description: No content
 */
Users.post(
  "/films",
  [
    body("userId").isNumeric().withMessage("The user id must be numerical"),
    body("filmId").isNumeric().withMessage("The film id must be numerical"),
    body("watched").exists(),
    body("watchlist").exists(),
    body("favorite").exists(),
  ],
  validateUtils.validate,
  UsersController.createUserFilm
);
/**
 * @swagger
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
 *         description: The id of the userFilm record.
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               watched:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film has been watched by the user
 *                 example: true
 *               watchlist:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film is on the user's watchlist
 *                 example: true
 *               favorites:
 *                 type: boolean
 *                 required: true
 *                 description: Boolean check if the film is a favourite film of the user
 *                 example: true
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
Users.patch("//:userId(\\d+)//:filmId(\\d+)", UsersController.updateUserFilm);

module.exports = Users;
