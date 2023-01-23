const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAll(req, res) {
  const users = await prisma.users.findMany();
  res.status(200).json(users);
}

async function getById(req, res) {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function getByUsername(req, res) {
  const { username } = req.params;
  const user = await prisma.users.findMany({
    where: {
      username: username,
    },
  });
  if (user) {
    return res.status(200).json(user);
  }
  res.sendStatus(204);
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: {
      id: parseInt(id),
    },
  });
}

async function getUserReviews(req, res) {
  const { id } = req.params;
  const reviews = await prisma.film_review.findMany({
    where: {
      user_id: parseInt(id),
    },
  });
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

  const films = await prisma.user_films.findMany({
    where: filter,
    select: {
      film_id: true,
    },
  });
  if (films) {
    return res.status(200).json(films);
  }
  res.sendStatus(204);
}

async function createUser(req, res) {
  const { email_address, username, user_password, date_of_birth } = req.body;
  await prisma.users.create({
    data: {
      username,
      user_password,
      email_address,
      date_of_birth,
      user_films: {
        create: user_films?.map((id) => {
          return {
            user_id: id,
          };
        }),
      },
    },
  });
  res.sendStatus(201);
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { email_address, username, user_password, date_of_birth } = req.body;
  await prisma.users.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username,
      user_password,
      email_address,
      date_of_birth,
    },
  });
  res.sendStatus(200);
}

async function updateUserFilms(req, res) {
  const { user, film } = req.params;
  const { watched, watchlist, favorites } = req.body;
  await prisma.user_films.update({
    where: {
      user_id: parseInt(user),
      film_id: parseInt(film),
    },
    data: {
      watched: watched,
      watchlist: watchlist,
      favorites: favorites,
    },
  });
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
  updateUserFilms,
};
