const { Router } = require("express");

const Actors = Router();

Actors.get("/:film_id(\\d+)").get((req, res) => {
  const { film_id } = req.query;
  res.status(200).json([
    {
      id: 1,
      name: "Chuck Norris",
      image: "www.googleImages.com",
      tmdb_id: 500,
    },
    {
      id: 5,
      name: "Keanu Reeves",
      image: "www.googleImages.com",
      tmdb_id: 4313,
    },
  ]);
});

module.exports = Actors;
