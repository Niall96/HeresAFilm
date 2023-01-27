const { filmsService } = require("../services");

async function getFilms(req, res) {
  const films = await filmsService.getFilms();
  if (films) {
    return res.status(200).json(films);
  }
  res.sendStatus(204);
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
    filmName,
    synopsis,
    genre,
    releaseDate,
    rating,
    imageLocation,
    tmdbId,
  } = req.body;
  await filmsService.createFilm(
    filmName,
    synopsis,
    genre,
    releaseDate,
    rating,
    imageLocation,
    tmdbId
  );
  res.status(201);
}

module.exports = {
  getFilms,
  getById,
  getActors,
  getFilmReviews,
  createFilm,
};
