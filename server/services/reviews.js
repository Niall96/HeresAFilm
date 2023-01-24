const prisma = require("../utils/prisma");

async function createReview(user_id, film_id, description, rating) {
  return await film_review.Create({
    data: {
      user_id: user_id,
      film_id: film_id,
      description: description,
      rating: rating,
    },
  });
}

async function deleteReview(id) {
  return await prisma.film_review.delete({
    where: {
      id: parseInt(id),
    },
  });
}

module.exports = {
  createReview,
  deleteReview,
};
