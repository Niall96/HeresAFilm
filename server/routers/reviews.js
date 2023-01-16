const { Router } = require("express");

const Reviews = Router();

Reviews.get("/:user_id(\\d+)", function (req, res) {
  const { user_id } = req.query;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Reviews.get("/:filmId(\\d+)", function (res, req) {
  const { film_id } = req.query;
  res.status(200).json([
    {
      user_id: 1,
      user_name: "Niall",
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
    {
      user_id: 1,
      user_name: "Niall",
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Reviews.post("/", function (req, res) {
  const { user_id, film_id, film_name, rating, description } = req.body;
  console.log(
    "user_id:",
    user_id,
    "film_id:",
    film_id,
    "film_name:",
    film_name,
    "rating:",
    rating,
    "description:",
    description
  );
  res.sendStatus(201);
});

Reviews.delete("/:reviewId(\\d+)", function (req, res) {
  const { reviewId } = req.params;
  console.log("${reviewId} deleted");
});
module.exports = Reviews;
