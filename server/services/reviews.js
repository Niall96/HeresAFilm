const prisma = require("../utils/prisma");

async function createReview(userId, filmId, username, description) {
  return await prisma.film_review.create({
    data: {
      user_id: userId,
      film_id: filmId,
      username: username,
      description: description,
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
