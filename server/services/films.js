const prisma = require("../utils/prisma");

async function getAll() {
  return await prisma.film.findMany();
}

async function getById(id) {
  return await prisma.film.findUnique({
    where: {
      id: parseInt(id),
    },
  });
}

async function getActors(id) {
  return await prisma.film_actors.findUnique({
    where: {
      film_id: parseInt(id),
    },
  });
}

async function getFilmReviews(id) {
  return await prisma.film_review.findMany({
    where: {
      film_id: parseInt(id),
    },
  });
}

async function createFilm(
  film_name,
  synopsis,
  genre,
  release_date,
  rating,
  image_location,
  tmdb_id
) {
  return await prisma.films.Create({
    data: {
      film_name,
      synopsis,
      genre,
      release_date,
      rating,
      image_location,
      tmdb_id,
    },
  });
}

module.exports = {
  getAll,
  getById,
  getActors,
  getFilmReviews,
  createFilm,
};
