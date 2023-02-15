const { reviewsService } = require("../services");

async function createReview(req, res) {
  const { userId, filmId, username, description } = req.body;
  await reviewsService.createReview(userId, filmId, username, description);
  res.sendStatus(201);
}

async function deleteReview(req, res) {
  const { id } = req.params;
  await reviewsService.deleteReview(id);
  res.sendStatus(200);
}

module.exports = {
  createReview,
  deleteReview,
};
