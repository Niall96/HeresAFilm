const request = require("supertest");
const app = require("../../app");

describe("/film", () => {
  describe("GET /films", () => {
    it("respond with json containing a list of a films", async () => {
      await request(app)
        .get("/films/")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /films/:film_id", () => {
    it("respond with film found by id", async () => {
      await request(app)
        .get("/films/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /film/:film_id/reviews", () => {
    it("respond with json containing a list of a film reviews", async () => {
      await request(app)
        .get("/films/1/reviews")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("POST /films", () => {
    const verifyFilmValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "filmName",
              msg: "The Film must have a name",
            }),
            expect.objectContaining({
              location: "body",
              param: "synopsis",
              msg: "Provide a synopsis of the film",
            }),
            expect.objectContaining({
              location: "body",
              param: "genre",
              msg: "The Film must have a genre",
            }),
            expect.objectContaining({
              location: "body",
              param: "rating",
              msg: "The rating must be numerical",
            }),
            expect.objectContaining({
              location: "body",
              msg: "The film must exist on the movie database",
              param: "tmdbId",
            }),
          ]),
        })
      );
    };
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/films")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyFilmValidation);
    });
    it("respond with 201 when user created successfully", async () => {
      const newFilm = {
        film_name: "filmName",
        synopsis: "synopsis",
        genre: "genre",
        releaseDate: "1000-00-00",
        rating: 1.0,
        imageLocation: "imageLocation",
        tmdbId: 11111,
      };
      await request(app)
        .post("/films")
        .set("Accept", "application/json")
        .send(newFilm)
        .expect("Content-Type", /json/);
    });
  });
});
