const request = require("supertest");
const app = require("../../app");

describe("/reviews", () => {
  describe("POST /reviews", () => {
    const verifyReviewValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "userId",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "filmId",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "rating",
              msg: "The rating must be numerical ",
            }),
            expect.objectContaining({
              location: "body",
              param: "description",
              msg: "The review must have a description.",
            }),
          ]),
        })
      );
    };
    it("respond with 201 when user created successfully", async () => {
      const newFilm = {
        user_id: 5,
        film_id: 5,
        description: "This a great integration test",
        rating: 9.5,
      };
      await request(app)
        .post("/reviews")
        .set("Accept", "application/json")
        .send(newFilm)
        .expect("Content-Type", /json/);
    });
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/reviews")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyReviewValidation);
    });
  });

  describe("DELETE /reviews/:id", () => {
    it("respond with 200 when review deleted", async () => {
      await request(app)
        .delete("/reviews/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
