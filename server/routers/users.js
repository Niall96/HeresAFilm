const { Router } = require("express");

const Users = Router();

Users.get("/", function (req, res) {
  const { name } = req.query;
  res.status(200).json([
    {
      id: 1,
      email_address: "user@email.com",
      user_name: "username",
      date_of_birth: "0000-00-00",
    },
    {
      id: 2,
      email_address: "user@email.com",
      user_name: "username",
      date_of_birth: "0000-00-00",
    },
  ]);
});

Users.get("/:user_id(\\d+)").get((req, res) => {
  const { user_id } = req.params;
  res.status(200).json({
    email_address: "user@email.com",
    user_name: "username",
    date_of_birth: "0000-00-00",
  });
});

Users.post("/", (req, res) => {
  const { email_address, user_name, date_of_birth } = req.body;
  console.log(
    "email:",
    email_address,
    "username:",
    user_name,
    "dob:",
    date_of_birth
  );
  res.sendStatus(201);
});

Users.delete("/:userId(\\d+)", function (req, res) {
  const { userId } = req.params;
  console.log("${userId} deleted");
});

Users.get("/:user_id(\\d+)/film_favourites").get((req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_favourites", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.put("/film_favourites", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(200);
});

Users.get("/:user_id(\\d+)/film_watched").get((req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_watched", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.put("/film_watched", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(200);
});

Users.get("/:user_id(\\d+)/film_suggestions").get((req, res) => {
  const { user_id } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      film_name: "FILM",
      rating: 8.5,
      description: "Great movie",
    },
  ]);
});

Users.post("/film_suggestions", (req, res) => {
  const { film_id_array } = req.body;
  console.log("film_ids:", film_id_array);
  res.sendStatus(201);
});

Users.delete("/film_suggestions", (req, res) => {});
module.exports = Users;
