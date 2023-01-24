const { filmsService } = require("../services");
const { film } = require("../utils/prisma");

async function getAll(req, res) {
  const films = await filmsService.getAll();
  if (films && films.length > 0) {
    return res.status(200).json(films);
  }
  res.status(204);
}

async function getById(req, res) {
  const { id } = req.params;
  const film = await filmsService.getById(id);
  if (film) {
    return res.status(200).json(film);
  }
  res.sendStatus(204);
}

async function getActors(req, res) {
  const { id } = req.params;
  const actors = await filmsService.getActors(id);
  if (actors) {
    return res.status(200).json(actors);
  }
  res.sendStatus(204);
}

async function getFilmReviews(req, res) {
  const { id } = req.params;
  const reviews = await filmsService.getFilmReviews(id);
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
  await filmsService.createFilm(
    film_name,
    synopsis,
    genre,
    release_date,
    rating,
    image_location,
    tmdb_id
  );
  res.sendStatus(201);
}

module.exports = {
  getAll,
  getById,
  getActors,
  getFilmReviews,
  createFilm,
};
