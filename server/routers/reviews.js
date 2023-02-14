const { Router } = require("express");
const { check } = require("express-validator");
const { validateUtils } = require("../utils");
const { ReviewsController } = require("../controllers");

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
 *               userId:
 *                 type: number
 *                 required: true
 *                 description: The unique id for the user posting review
 *               filmId:
 *                 type: number
 *                 required: true
 *                 description: The unique id of the film
 *               username:
 *                 type: string
 *                 required: true
 *                 description: The unique name for the user posting review
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
    check("userId").isNumeric(),
    check("filmId").isNumeric(),
    check("description")
      .isLength({ min: 1, max: 200 })
      .withMessage("The review must have a description.")
      .trim(),
  ],
  validateUtils.validate,
  ReviewsController.createReview
);
/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags: [
 *       reviews
 *     ]
 *     summary: Deletes user's film review
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         description: The ID of the film review
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *       204:
 *         description: No content
 */
Reviews.delete("/:id(\\d+)", ReviewsController.deleteReview);
module.exports = Reviews;
