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

const Reviews = Router();

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
Reviews.post(
  "/",
  [
    check("user_id").matches(/d/).isNumeric(),
    check("film_id").matches(/d/).isNumeric(),
    check("rating").isNumeric().withMessage("The rating must be numerical "),
    check("description")
      .isLength({ min: 1, max: 200 })
      .withMessage("The review must have a description.").trim,
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
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
Reviews.delete("/:id(\\d+)/", function (req, res) {
  const { id } = req.params;
  console.log("review deleted");
});
module.exports = Reviews;
