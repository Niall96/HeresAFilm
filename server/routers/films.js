const { Router } = require("express");

const Films = Router();

Films.get("/:film_id(\\d+)").get((req, res) => {
  const { film_id } = req.params;
  res.status(200).json({
    film_name: "film name",
    description: "This is a movie",
    genre: "Action",
    release_date: "0000-00-00",
    rating: 8.5,
    image_location: "www.google.com",
    tmdb_id: 100,
  });
});

Films.post("/", function (req, res) {
  const { film_name, description, genre, rating, image_location, tmdb_id } =
    req.body;
  console.log(
    "film_name:",
    film_name,
    "description:",
    description,
    "genre:",
    genre,
    "rating:",
    rating,
    "image_location:",
    image_location,
    "tmdb_id:",
    tmdb_id
  );
  res.sendStatus(201);
});
module.exports = Films;
