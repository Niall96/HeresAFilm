const { usersService } = require("../services");

async function getAll(req, res) {
  const users = await usersService.getUsers();
  if (users) {
    return res.status(200).json(users);
  }
  res.sendStatus(204);
}

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getUserById(id);
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function getUserByEmail(req, res) {
  const { emailAddress } = req.params;
  const user = await usersService.getUserByEmail(emailAddress);
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.sendStatus(200);
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
  const { emailAddress, username, password, dateOfBirth } = req.body;
  const emailExists = await usersService.getUserByEmail(emailAddress);
  if (emailExists) {
    return res.sendStatus(409);
  }
  await usersService.createUser(emailAddress, username, password, dateOfBirth);
  res.sendStatus(201);
}

async function createUserFilm(req, res) {
  const { userId, filmId, watched, watchlist, favorite } = req.body;
  await usersService.createUserFilm(
    userId,
    filmId,
    watched,
    watchlist,
    favorite
  );
  res.sendStatus(201);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { emailAddress, username, dateOfBirth } = req.body;
  await usersService.updateUser(id, emailAddress, username, dateOfBirth);
  res.sendStatus(200);
}

async function updateUserFilm(req, res) {
  const { userId, filmId } = req.params;
  const { watched, watchlist, favorite } = req.body;
  await usersService.updateUserFilms(
    userId,
    filmId,
    watched,
    watchlist,
    favorite
  );
  res.sendStatus(200);
}

module.exports = {
  getAll,
  getById,
  getUserByEmail,
  deleteUser,
  getUserReviews,
  getUserFilms,
  createUser,
  updateUser,
  updateUserFilm,
  createUserFilm,
};
