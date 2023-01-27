const { reviewsService } = require("../services");

async function createReview(req, res) {
  const { userId, filmId, description, rating } = req.body;
  await reviewsService.createReview(userId, filmId, description, rating);
  res.status(201);
}

async function deleteReview(req, res) {
  const { id } = req.params;
  const deletedReview = await reviewsService.deleteReview(id);
  res.status(200).json(deletedReview);
}

module.exports = {
  createReview,
  deleteReview,
};
