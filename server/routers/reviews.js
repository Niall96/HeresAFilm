const { Router } = require("express");

const Reviews = Router();
/**
 * @swagger
 * /reviews/{user_id}:
 *   get:
 *     tags: [
 *       reviews
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
Reviews.get("/:user_id(\\d+)", function (req, res) {
  const { user_id } = req.query;
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
 * /reviews/{film_id}:
 *   get:
 *     tags: [
 *       reviews
 *     ]
 *     summary: Returns an array of reviews from a film
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
Reviews.get("/:filmId(\\d+)", function (res, req) {
  const { film_id } = req.query;
  res.status(200).json([
    {
      user_id: 1,
      user_name: "Niall",
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
    {
      user_id: 1,
      user_name: "Niall",
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});
/**
 * @swagger
 * /reviews:
 *   post:
 *     tags: [
 *       reviews
 *     ]
 *     summary: Creates a new review about a film
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
Reviews.post("/", function (req, res) {
  const { user_id, film_id, film_name, rating, description } = req.body;
  console.log(
    "user_id:",
    user_id,
    "film_id:",
    film_id,
    "film_name:",
    film_name,
    "rating:",
    rating,
    "description:",
    description
  );
  res.sendStatus(201);
});
/**
 * @swagger
 * /reviews/{user_id}/{film_id}}:
 *   delete:
 *     tags: [
 *       reviews
 *     ]
 *     summary: Deletes user's film review
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
Reviews.delete("/:reviewId(\\d+)", function (req, res) {
  const { reviewId } = req.params;
  console.log("${reviewId} deleted");
});
module.exports = Reviews;
