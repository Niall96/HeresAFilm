const prisma = require("../utils/prisma");

async function getFilms() {
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
  return await prisma.film_actors.findMany({
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
  filmName,
  synopsis,
  genre,
  releaseDate,
  rating,
  imageLocation,
  tmdbId
) {
  await prisma.film.create({
    data: {
      film_name: filmName,
      synopsis: synopsis,
      genre: genre,
      release_date: releaseDate,
      rating: rating,
      image_location: imageLocation,
      tmdb_id: tmdbId,
    },
  });
}

module.exports = {
  getFilms,
  getById,
  getActors,
  getFilmReviews,
  createFilm,
};
