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

module.exports = {
  getAll,
  getById,
};
