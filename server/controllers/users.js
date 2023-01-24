const { PrismaClient } = require("@prisma/client");
const { usersService } = require("../services");

const prisma = new PrismaClient();

async function getAll(req, res) {
  const users = await usersService.getUsers();
  res.status(200).json(users);
}

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function getByUsername(req, res) {
  const { username } = req.params;
  const user = await usersService.getUserByUsername(username);
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await usersService.deleteUser(id);
  res.sendStatus(200).json(user);
}

async function getUserReviews(req, res) {
  const { id } = req.params;
  const reviews = await usersService.getUserReviews(id);
  if (reviews) {
    return res.status(200).json(reviews);
  }
  res.sendStatus(204);
}

async function getUserFilms(req, res) {
  const { id } = req.params;
  const { watched, watchlist, favorites } = req.query;
  let filter = {
    user_id: parseInt(id),
  };

  if (watched) {
    filter.watched = watched === "true";
  }
  if (watchlist) {
    filter.watchlist = watchlist === "true";
  }
  if (favorites) {
    filter.favorites = favorites === "true";
  }

  const films = await usersService.getUserFilms(filter);
  if (films) {
    return res.status(200).json(films);
  }
  res.sendStatus(204);
}

async function createUser(req, res) {
  const { email_address, username, user_password, date_of_birth } = req.body;
  const newUser = await usersService.createUser(
    email_address,
    username,
    user_password,
    date_of_birth
  );
  res.sendStatus(201).json(newUser);
}

async function createUserFilm(req, res) {
  const { user_id, film_id, watched, watchlist, favorites } = req.body;
  const newUserFilm = await usersService.createUserFilm(
    user_id,
    film_id,
    watched,
    watchlist,
    favorites
  );
  res.sendStatus(201).json(newUserFilm);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { email_address, username, date_of_birth } = req.body;
  await usersService.updateUser(id, email_address, username, date_of_birth);
  res.sendStatus(200);
}

async function updateUserFilm(req, res) {
  const { id } = req.params;
  const { watched, watchlist, favorites } = req.body;
  await usersService.updateUserFilms(id, watched, watchlist, favorites);
  res.sendStatus(200);
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  deleteUser,
  getUserReviews,
  getUserFilms,
  createUser,
  updateUser,
  updateUserFilm,
  createUserFilm,
};
