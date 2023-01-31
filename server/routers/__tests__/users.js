const request = require("supertest");
const app = require("../../app");

describe("/users", () => {
  describe("GET /users", () => {
    it("respond with json containing a list of a users", async () => {
      await request(app)
        .get("/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:userId", () => {
    it("respond with user found by id", async () => {
      await request(app)
        .get("/users/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("POST /users", () => {
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);
    });
    // it("respond with 201 when user created successfully", async () => {
    //   const newUser = {
    //     username: "filmName",
    //     emailAddress: "synopsis",
    //     password: "Password1!",
    //     dateOfBirth: "2023-01-31T11:50:27.128Z",
    //   };
    //   await request(app)
    //     .post("/users")
    //     .set("Accept", "application/json")
    //     .send(newUser)
    //     .expect("Content-Type", /json/)
    //     .expect(201);
    // });
  });

  describe("GET /users/:userId/reviews", () => {
    it("respond with user reviews found by id", async () => {
      await request(app)
        .get("/users/1/reviews")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /users/:userId/films", () => {
    it("respond with user films found by id", async () => {
      await request(app)
        .get("/users/1/films")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
