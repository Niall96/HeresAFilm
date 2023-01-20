const { PrismaClient } = require("@prisma/client");

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

module.exports = {
  getAll,
  getById,
  getByUsername,
  deleteUser,
};
