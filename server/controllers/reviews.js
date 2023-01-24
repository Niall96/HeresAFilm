const { PrismaClient } = require("@prisma/client");
const { reviewsService } = require("../services");

const prisma = new PrismaClient();

async function createReview(req, res) {
  const { user_id, film_id, description, rating } = req.body;
  const review = await reviewsService.createReview(
    user_id,
    film_id,
    description,
    rating
  );
  res.sendStatus(201).json(review);
}

async function deleteReview(req, res) {
  const { id } = req.params;
  const deletedReview = await reviewsService.deleteReview(id);
  res.sendStatus(200).json(deletedReview);
}

module.exports = {
  createReview,
  deleteReview,
};
