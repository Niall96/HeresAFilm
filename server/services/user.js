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

async function getUserById() {
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

async function getUserByUsername() {
  return await prisma.users.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email_address: true,
      date_of_birth: true,
    },
  });
}

async function createUser(
  email_address,
  username,
  user_password,
  date_of_birth
) {
  const hashedPassword = await bcrypt.hash(user_password, 10);
  return await prisma.users.create({
    data: {
      username: username,
      user_password: hashedPassword,
      email_address: email_address,
      date_of_birth: date_of_birth,
    },
  });
}

async function createUserFilm(user_id, film_id, watched, watchlist, favorites) {
  return await prisma.users.create({
    data: {
      user_id: user_id,
      film_id: film_id,
      watched: watched,
      watchlist: watchlist,
      favorites: favorites,
    },
  });
}

async function updateUser(id, email_address, username, date_of_birth) {
  return await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username,
      email_address,
      date_of_birth,
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
  getUserByUsername,
  createUser,
  createUserFilm,
  updateUser,
  deleteUser,
  getUserReviews,
  getUserFilms,
  updateUserFilms,
};
