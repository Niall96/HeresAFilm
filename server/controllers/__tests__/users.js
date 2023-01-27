const userController = require("../users");
const { usersService } = require("../../services");
const { when } = require("jest-when");
const { UsersController } = require("..");

jest.mock("../../services/users");

describe("userController", () => {
  describe("createUser", () => {
    it("should return a 201 once a new user is created", async () => {
      const emailAddress = "test email";
      const username = "test";
      const password = "testPassword";
      const dateOfBirth = "1000-00-00";

      when(usersService.createUser).calledWith(
        emailAddress,
        username,
        password,
        dateOfBirth
      );

      const req = {
        body: {
          emailAddress: emailAddress,
          username: username,
          password: password,
          dateOfBirth: dateOfBirth,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);

      await userController.createUser(req, res);

      expect(usersService.createUser).toBeCalledWith(
        emailAddress,
        username,
        password,
        dateOfBirth
      );

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("deleteUser", () => {
    it("should return a 200 once a user is deleted", async () => {
      const id = 1;
      const deletedUser = { id: 1 };

      when(usersService.deleteUser)
        .calledWith(id)
        .mockReturnValueOnce(deletedUser);
      const req = {
        params: {
          id: id,
        },
      };

      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await userController.deleteUser(req, res);

      expect(usersService.deleteUser).toHaveBeenCalledWith(id);
      expect(usersService.deleteUser).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("getUsers", () => {
    it("should return a 200 when users are available", async () => {
      const users = [{ id: 1 }];
      usersService.getUsers.mockReturnValueOnce(users);
      const req = {};
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await userController.getAll(req, res);

      expect(usersService.getUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getUsersById", () => {
    it("should return a 200 when users are available", async () => {
      const id = 1;
      const users = [{ id: 1 }];

      when(usersService.getUserById).calledWith(id).mockReturnValueOnce(users);
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await userController.getById(req, res);

      expect(usersService.getUserById).toHaveBeenCalledWith(id);
      expect(usersService.getUserById).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getUsersByEmail", () => {
    it("should return a 200 when users are available", async () => {
      const emailAddress = "test@email.com";
      const users = [{ id: 1 }];

      when(usersService.getUserByEmail)
        .calledWith(emailAddress)
        .mockReturnValueOnce(users);
      const req = {
        params: {
          emailAddress: emailAddress,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await userController.getUserByEmail(req, res);

      expect(usersService.getUserByEmail).toHaveBeenCalledWith(emailAddress);
      expect(usersService.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(users);
    });
  });

  describe("getUserReviews", () => {
    it("should return a 200 when user reviews are available", async () => {
      const id = 1;
      const reviews = [{ id: 1 }];

      when(usersService.getUserReviews)
        .calledWith(id)
        .mockReturnValueOnce(reviews);

      const req = {
        params: {
          id: id,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await userController.getUserReviews(req, res);

      expect(usersService.getUserReviews).toHaveBeenCalledWith(id);
      expect(usersService.getUserReviews).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(reviews);
    });
  });

  describe("createUserFilm", () => {
    it("should return a 201 once a new userFilm row is created", async () => {
      const userId = 1;
      const filmId = 1;
      const watched = true;
      const watchlist = true;
      const favorites = true;

      when(usersService.createUserFilm).calledWith(
        userId,
        filmId,
        watched,
        watchlist,
        favorites
      );

      const req = {
        body: {
          userId: userId,
          filmId: filmId,
          watched: watched,
          watchlist: watchlist,
          favorites: favorites,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);

      await userController.createUserFilm(req, res);

      expect(usersService.createUserFilm).toBeCalledWith(
        userId,
        filmId,
        watched,
        watchlist,
        favorites
      );

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
