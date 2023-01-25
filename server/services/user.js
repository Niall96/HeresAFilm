const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");

async function getUsers() {
  return await prisma.users.findMany({
    select: {
      username: true,
      email_address: true,
      date_of_birth: true,
    },
  });
}

async function getUserById(id) {
  return await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      username: true,
      email_address: true,
      date_of_birth: true,
    },
  });
}

async function getUserByEmail(emailAddress) {
  const users = await prisma.users.findMany({
    where: {
      email_address: emailAddress,
    },
    select: {
      id: true,
      username: true,
      user_password: true,
      email_address: true,
      date_of_birth: true,
    },
  });
  return users[0];
}

async function createUser(emailAddress, username, password, dateOfBirth) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.users.create({
    data: {
      username: username,
      user_password: hashedPassword,
      email_address: emailAddress,
      date_of_birth: dateOfBirth,
    },
  });
}

async function createUserFilm(userId, filmId, watched, watchlist, favorites) {
  return await prisma.users.create({
    data: {
      user_id: userId,
      film_id: filmId,
      watched: watched,
      watchlist: watchlist,
      favorites: favorites,
    },
  });
}

async function updateUser(id, emailAddress, username, dateOfBirth) {
  return await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username: username,
      email_address: emailAddress,
      date_of_birth: dateOfBirth,
    },
  });
}

async function deleteUser(id) {
  return await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function getUserReviews(id) {
  const reviews = await prisma.film_review.findMany({
    where: {
      user_id: parseInt(id),
    },
  });
}

async function getUserFilms(filter) {
  return await prisma.user_films.findMany({
    where: filter,
    select: {
      film_id: true,
    },
  });
}

async function updateUserFilms(id, watched, watchlist, favorites) {
  return await prisma.user_films.update({
    where: {
      id: parseInt(id),
    },
    data: {
      watched: watched,
      watchlist: watchlist,
      favorites: favorites,
    },
  });
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  createUserFilm,
  updateUser,
  deleteUser,
  getUserReviews,
  getUserFilms,
  updateUserFilms,
};
