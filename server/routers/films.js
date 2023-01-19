const { Router } = require("express");
const { check, validationResult } = require("express-validator");

function validate(req, res, next) {
  const error = validationResult(req);
  const hasError = !error.isEmpty();

  if (hasError) {
    res.status(400).json({ error: error.array({ onlyFirstError: true }) });
  } else {
    next();
  }
}

const Films = Router();
/**
 * @swagger
 * /films:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     summary: Returns film list
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
Films.get("/", (req, res) => {
  res.status(200).json({
    film_name: "film name",
    description: "This is a movie",
    genre: "Action",
    release_date: "0000-00-00",
    rating: 8.5,
    image_location: "www.google.com",
    tmdb_id: 100,
  });
});
/**
 * @swagger
 * /films/{id}:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     summary: Returns a specific film
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
Films.get("/:film_id(\\d+)", (req, res) => {
  const { film_id } = req.params;
  res.status(200).json({
    film_name: "film name",
    description: "This is a movie",
    genre: "Action",
    release_date: "0000-00-00",
    rating: 8.5,
    image_location: "www.google.com",
    tmdb_id: 100,
  });
});

/**
 * @swagger
 * /films/{id}/actors:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     summary: returns an array of actors from specified film
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
Films.get("/:film_id(\\d+)/actors").get((req, res) => {
  const { film_id } = req.query;
  res.status(200).json([
    {
      id: 1,
      name: "Chuck Norris",
      image: "www.googleImages.com",
      tmdb_id: 500,
    },
    {
      id: 5,
      name: "Keanu Reeves",
      image: "www.googleImages.com",
      tmdb_id: 4313,
    },
  ]);
});

/**
 * @swagger
 * /films:
 *   post:
 *     tags: [
 *       films
 *     ]
 *     summary: Create a new film to add to list
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
Films.post(
  "/",
  [
    check("film_name").exists().withMessage("The Film must have a name").trim(),
    check("description")
      .isLength({ min: 10 })
      .withMessage("Provide a synopsis of the film")
      .exists()
      .withMessage("The Film must have a synopsis")
      .trim(),
    check("genre").exists().withMessage("The Film must have a genre"),
    check("rating").isNumeric().withMessage("The rating must be numerical"),
    check("tmdb_id")
      .exists()
      .withMessage("The film must exist on the movie database"),
  ],
  validate,
  function (req, res) {
    const { film_name, description, genre, rating, image_location, tmdb_id } =
      req.body;
    console.log(
      "film_name:",
      film_name,
      "description:",
      description,
      "genre:",
      genre,
      "rating:",
      rating,
      "image_location:",
      image_location,
      "tmdb_id:",
      tmdb_id
    );
    res.sendStatus(201);
  }
);

/**
 * @swagger
 * /films/{id}/reviews:
 *   get:
 *     tags: [
 *       films
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
Films.get("/:id(\\d+)/reviews", function (res, req) {
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
module.exports = Films;
