const { Router } = require("express");

const UserFilms = Router();

/**
 * @swagger
 * /userFilms/{id}/getFilmList:
 *   get:
 *     tags: [
 *       userFilms
 *     ]
 *     summary: Returns list of films by specified status
 *     operationId: getFilmList
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Is the film considered a favourite
 *         required: false
 *         explode: true
 *         schema:
 *           type: string
 *           default: watched
 *           enum:
 *             - watched
 *             - watchlist
 *             - favorite
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
UserFilms.get("/:user_id(\\d+)/getFilmList", function (req, res) {
  const { user_id, status } = req.params;
  res.status(200).json([
    {
      film_id: 1,
      status: 2,
    },
    {
      film_id: 5,
      status: 1,
    },
  ]);
});

/**
 * @swagger
 * /userFilms/:
 *   post:
 *     tags: [
 *       userFilms
 *     ]
 *     summary: Creates UserFilms List
 *     operationId: getFilmList
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
UserFilms.post("/", (req, res) => {
  const { film_id, status } = req.body;
  console.log("film_id:", film_id, "status:", status);
  res.sendStatus(201);
});

/**
 * @swagger
 * /userFilms/{id}:
 *   patch:
 *     tags: [
 *       userFilms
 *     ]
 *     summary: Updates UserFilms List
 *     operationId: getFilmList
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             examples:
 *               jsonObject:
 *                 summary: An example JSON response
 *                 value: '[{ "id": 1, "name": "Some Items", "key": "SI" }, { "id": 2, "summary": "More Items", "key": "MI" }]'
 *       204:
 *         description: No content
 */
UserFilms.patch("//:userId(\\d+)", (req, res) => {
  const { film_id, status } = req.body;
  console.log("film_id:", film_id, "status:", status);
  res.sendStatus(201);
});
module.exports = UserFilms;
