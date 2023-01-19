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

const Reviews = Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags: [
 *       reviews
 *     ]
 *     summary: Creates a new review about a film
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *                 required: true
 *                 description: The unique id for the user posting review
 *               film_id:
 *                 type: number
 *                 required: true
 *                 description: The unique id of the film
 *               rating:
 *                 type: number
 *                 required: true
 *                 description: The user rating for the film
 *               description:
 *                 type: string
 *                 required: true
 *                 description: The user review for the film
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '{ "user_id": 1, "film_id": 2, "rating": 5.3, "description": "Such a meh film" }'
 *       204:
 *         description: No content
 */
Reviews.post(
  "/",
  [
    check("user_id").isNumeric(),
    check("film_id").isNumeric(),
    check("rating").isNumeric().withMessage("The rating must be numerical "),
    check("description")
      .isLength({ min: 1, max: 200 })
      .withMessage("The review must have a description.")
      .trim(),
  ],
  validate,
  function (req, res) {
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
  }
);
/**
 * @swagger
 * /reviews/{id}:
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
 *       204:
 *         description: No content
 */
Reviews.delete("/:id(\\d+)/", function (req, res) {
  const { id } = req.params;
  console.log("review deleted");
});
module.exports = Reviews;
