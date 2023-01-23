const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createReview(req, res) {
  const { user_id, film_id, description, rating } = req.body;
  const review = await film_review.Create({
    data: {
      user_id: user_id,
      film_id: film_id,
      description: description,
      rating: rating,
    },
  });
  res.sendStatus(201);
}

async function deleteReview(req, res) {
  const { id } = req.params;
  const review = await prisma.film_review.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  createReview,
  deleteReview,
};
