const { Router } = require("express");

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
Users.post("/", (req, res) => {
  const { email_address, user_name, date_of_birth } = req.body;
  console.log(
    "email:",
    email_address,
    "username:",
    user_name,
    "dob:",
    date_of_birth
  );
  res.sendStatus(201);
});
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

Users.get("/:user_id(\\d+)/film_favourites", (req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_favourites", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.put("/film_favourites", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(200);
});

Users.get("/:user_id(\\d+)/film_watched", (req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_watched", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.put("/film_watched", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(200);
});

Users.get("/:user_id(\\d+)/film_suggestions", (req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_suggestions", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.delete("/film_suggestions", (req, res) => {});
module.exports = Users;
