const { Router } = require("express");
const { check } = require("express-validator");
const { validateUtils } = require("../utils");
const { FilmsController } = require("../controllers");

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
 *                 value: '[{  "filmName": "Black Dynamite", "description": "How do you describe Black Dynamite", "genre": "Parody", "rating": 7.5,"imageLocation": "www.google.com", "tmdbId": 1000 }, {  "filmName": "Black Dynamite", "description": "How do you describe Black Dynamite", "genre": "Parody", "rating": 7.5,"imageLocation": "www.google.com", "tmdbId": 1000 }]'
 *       204:
 *         description: No content
 */
Films.get("/", FilmsController.getAll);

/**
 * @swagger
 * /films/{id}:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     summary: Returns a specific film
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested film.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "film_name": "Black Dynamite", "description": "How do you describe Black Dynamite", "genre": "Parody", "rating": 7.5,"image_location": "www.google.com", "tmdb_id": 1000 }'
 *       204:
 *         description: No content
 */
Films.get("/:id(\\d+)", FilmsController.getById);

/**
 * @swagger
 * /films/{id}/actors:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     summary: returns an array of actors from specified film
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested film.
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
Films.get("/:filmId(\\d+)/actors", FilmsController.getActors);

/**
 * @swagger
 * /films:
 *   post:
 *     tags: [
 *       films
 *     ]
 *     summary: Create a new film to add to list
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmName:
 *                 type: string
 *                 required: true
 *                 description: The name for the film
 *                 example: Hard Boiled 2
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The synopsis for the user
 *                 example: A Cop Film with a lot shooting, directed by John Woo
 *               genre:
 *                 type: string
 *                 required: true
 *                 description: The genre of the film
 *                 example: Action
 *               releaseDate:
 *                 type: string
 *                 required: true
 *                 description: The release date of the film
 *                 example: "1997-07-15"
 *               rating:
 *                 type: number
 *                 required: true
 *                 description: The overall rating of the film
 *                 example: 7.4
 *               imageLocation:
 *                 type: string
 *                 required: true
 *                 description: the location where the movie poster is stored
 *                 example: www.google.com
 *               tmdbId:
 *                 type: integer
 *                 required: true
 *                 description: The Movie Database ID of film
 *                 example: 50343
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "film_name": "Black Dynamite", "description": "How do you describe Black Dynamite", "genre": "Parody", "rating": 7.5,"image_location": "www.google.com", "tmdb_id": 1000 }'
 *       204:
 *         description: No content
 */
Films.post(
  "/",
  [
    check("filmName").exists().withMessage("The Film must have a name").trim(),
    check("description")
      .isLength({ min: 10 })
      .withMessage("Provide a synopsis of the film")
      .exists()
      .withMessage("The Film must have a synopsis")
      .trim(),
    check("genre").exists().withMessage("The Film must have a genre"),
    check("rating").isNumeric().withMessage("The rating must be numerical"),
    check("tmdbId")
      .exists()
      .withMessage("The film must exist on the movie database"),
  ],
  validateUtils.validate,
  FilmsController.createFilm
);

/**
 * @swagger
 * /films/{id}/reviews:
 *   get:
 *     tags: [
 *       films
 *     ]
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the requested film.
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
Films.get("/:id(\\d+)/reviews", FilmsController.getFilmReviews);
module.exports = Films;
