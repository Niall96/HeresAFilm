const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAll(req, res) {
  const films = await prisma.film.findMany();
  res.status(200).json(films);
}

async function getById(req, res) {
  const { id } = req.params;
  const film = await prisma.film.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (film) {
    return res.status(200).json(film);
  }
  res.sendStatus(204);
}

async function getActors(req, res) {
  const { id } = req.params;
  const actors = await prisma.film_actors.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (actors) {
    return res.status(200).json(actors);
  }
  res.sendStatus(204);
}

async function getFilmReviews(req, res) {
  const { id } = req.params;
  const reviews = await prisma.film_review.findMany({
    where: {
      film_id: parseInt(id),
    },
  });
  if (reviews) {
    return res.status(200).json(reviews);
  }
  res.sendStatus(204);
}

async function createFilm(req, res) {
  const {
    film_name,
    synopsis,
    genre,
    release_date,
    rating,
    image_location,
    tmdb_id,
  } = req.body;
  const review = await films.Create({
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
  res.sendStatus(201);
}

module.exports = {
  getAll,
  getById,
  getActors,
  getFilmReviews,
  createFilm,
};
