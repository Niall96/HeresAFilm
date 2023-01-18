const { Router } = require("express");
const { check, validationResult } = require("express-validator");

function validate(req, res, next) {
  const error = validationResult(req);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(400).json({ error: error.array() });
  } else {
    next();
  }
}

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
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
Users.get("/", function (req, res) {
  const { name } = req.query;
  res.status(200).json([
    {
      id: 1,
      email_address: "user@email.com",
      user_name: "username",
      date_of_birth: "0000-00-00",
    },
    {
      id: 2,
      email_address: "user@email.com",
      user_name: "username",
      date_of_birth: "0000-00-00",
    },
  ]);
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: returns a specified user
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
Users.get("/:user_id(\\d+)", (req, res) => {
  const { user_id } = req.params;
  res.status(200).json({
    email_address: "user@email.com",
    user_name: "username",
    date_of_birth: "0000-00-00",
  });
});
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [
 *       users
 *     ]
 *     summary: Creates a new user with the name and key
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
Users.post(
  "/",
  [
    check("email")
      .isLength({ min: 3 })
      .withMessage("the email must have minimum length of 3")
      .isEmail()
      .withMessage("the email must be in a valid email format")
      .trim(),
    check("username")
      .isLength({ min: 6 })
      .withMessage("the username must have minimum length of 6")
      .trim(),
    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("the password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("the password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("the password should have at least one special character"),
  ],
  validate,
  (req, res) => {
    const { email_address, user_name, password, date_of_birth } = req.body;
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
Users.delete("/:userId(\\d+)", function (req, res) {
  const { userId } = req.params;
  console.log("${userId} deleted");
});
/**
 * @swagger
 * /users/{id}/reviews:
 *   get:
 *     tags: [
 *       users
 *     ]
 *     summary: Returns an array of users reviews
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
Users.get("/:id(\\d+)/reviews", function (req, res) {
  const { id } = req.query;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
    {
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
 * /user/{id}/films:
 *   patch:
 *     tags: [
 *       users
 *     ]
 *     summary: Updates User Films list
 *     operationId: films
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
Users.patch(
  "//:id(\\d+)",
  [check("film_id").isNumeric, check("status").isNumeric],
  (req, res) => {
    const { film_id, status } = req.body;
    console.log("film_id:", film_id, "status:", status);
    res.sendStatus(201);
  }
);

module.exports = Users;
