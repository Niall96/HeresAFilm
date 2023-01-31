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
    const verifyUserValidation = (res) => {
      expect(res.body).toEqual(
        expect.objectContaining({
          error: expect.arrayContaining([
            expect.objectContaining({
              location: "body",
              param: "emailAddress",
              msg: "the email must have minimum length of 3",
            }),
            expect.objectContaining({
              location: "body",
              param: "emailAddress",
              msg: "the email must be in a valid email format",
            }),
            expect.objectContaining({
              location: "body",
              param: "username",
              msg: "the username must have minimum length of 6",
            }),
            expect.objectContaining({
              location: "body",
              param: "username",
              msg: "Invalid value",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "the password should have min and max length between 8-15",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "the password should have at least one number",
            }),
            expect.objectContaining({
              location: "body",
              param: "password",
              msg: "the password should have at least one special character",
            }),
            expect.objectContaining({
              location: "body",
              param: "dateOfBirth",
              msg: "Invalid value",
            }),
          ]),
        })
      );
    };
    it("respond with 400 for missing data", async () => {
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send({})
        .expect("Content-Type", /json/)
        .expect(400)
        .expect(verifyUserValidation);
    });
    it("respond with 201 when user created successfully", async () => {
      const newUser = {
        username: "filmName",
        emailAddress: "synopsis",
        password: "Password1!",
        dateOfBirth: "1000-00-00",
      };
      await request(app)
        .post("/users")
        .set("Accept", "application/json")
        .send(newUser)
        .expect("Content-Type", /json/);
    });
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
