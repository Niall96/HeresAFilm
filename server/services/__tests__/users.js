const usersService = require("../users");
const prisma = require("../../utils/prisma");
const { when } = require("jest-when");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("usersService", () => {
  describe("getUsers", () => {
    it("should return users when users found", async () => {
      const users = [{ id: 1 }];
      prisma.users = { findMany: jest.fn().mockReturnValueOnce(users) };

      const result = await usersService.getUsers();

      expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(users);
    });
  });

  describe("getUsersbyId", () => {
    it("should return users when id found", async () => {
      const userId = 1;
      const user = {};
      prisma.users = { findUnique: jest.fn().mockReturnValueOnce(user) };

      const result = await usersService.getUserById(userId);

      expect(prisma.users.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.users.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: userId,
          },
          select: {
            id: true,
            username: true,
            email_address: true,
            date_of_birth: true,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  describe("getUsersbyEmail", () => {
    it("should return users when email found", async () => {
      const userEmail = "test";
      const user = false;
      prisma.users = { findMany: jest.fn().mockReturnValueOnce(user) };

      const result = await usersService.getUserByEmail(userEmail);

      expect(prisma.users.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.users.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            email_address: userEmail,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  describe("createUser", () => {
    it("should return user when created", async () => {
      const emailAddress = "test email";
      const username = "test";
      const password = "testPassword";
      const dateOfBirth = "1000-00-00";
      const expectedResult = {
        emailAddress,
        username,
        password,
        dateOfBirth,
      };

      prisma.users = {
        create: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await usersService.createUser(
        emailAddress,
        username,
        password,
        dateOfBirth
      );

      expect(prisma.users.create).toHaveBeenCalledTimes(1);
      expect(prisma.users.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            username: username,
            email_address: emailAddress,
            date_of_birth: dateOfBirth,
          }),
        })
      );
    });
  });

  describe("updateUser", () => {
    it("should return user when updated", async () => {
      const userId = 1;
      const emailAddress = "test email";
      const username = "test";
      const dateOfBirth = "1000-00-00";
      const expectedResult = {
        emailAddress,
        username,
        dateOfBirth,
      };

      prisma.users = {
        update: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await usersService.updateUser(
        userId,
        emailAddress,
        username,
        dateOfBirth
      );

      expect(prisma.users.update).toHaveBeenCalledTimes(1);
      expect(prisma.users.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: userId,
          },
          data: expect.objectContaining({
            username: username,
            email_address: emailAddress,
            date_of_birth: dateOfBirth,
          }),
        })
      );
    });
  });

  describe("deleteUser", () => {
    it("should delete user with id found", async () => {
      const userId = 1;
      const user = {};
      prisma.users = { delete: jest.fn().mockReturnValueOnce(user) };

      const result = await usersService.deleteUser(userId);

      expect(prisma.users.delete).toHaveBeenCalledTimes(1);
      expect(prisma.users.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: userId,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  describe("getUserFilms", () => {
    it("should return user's films when id found", async () => {
      const filter = 1;
      const userFilm = [{ id: 1 }];
      prisma.user_films = {
        findMany: jest.fn().mockReturnValueOnce(userFilm),
      };

      const result = await usersService.getUserFilms(filter);

      expect(prisma.user_films.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.user_films.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: filter,
          select: {
            film_id: true,
          },
        })
      );
      expect(result).toEqual(userFilm);
    });
  });

  describe("createUserFilm", () => {
    it("should return user film entry when created", async () => {
      const userId = 1;
      const filmId = 1;
      const watched = true;
      const watchlist = true;
      const favorites = false;
      const expectedResult = {
        userId,
        filmId,
        watched,
        watchlist,
        favorites,
      };

      prisma.user_films = {
        create: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await usersService.createUserFilm(
        userId,
        filmId,
        watched,
        watchlist,
        favorites
      );

      expect(prisma.user_films.create).toHaveBeenCalledTimes(1);
      expect(prisma.user_films.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            user_id: userId,
            film_id: filmId,
            watched: watched,
            watchlist: watchlist,
            favorites: favorites,
          }),
        })
      );
    });
  });

  describe("updateUserFilm", () => {
    it("should return user film entry when updated", async () => {
      const id = 1;
      const watched = true;
      const watchlist = true;
      const favorites = true;
      const expectedResult = {
        watched,
        watchlist,
        favorites,
      };

      prisma.user_films = {
        update: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await usersService.updateUserFilms(id, watched, watchlist, favorites);

      expect(prisma.user_films.update).toHaveBeenCalledTimes(1);
      expect(prisma.user_films.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: id,
          },
          data: expect.objectContaining({
            watched: watched,
            watchlist: watchlist,
            favorites: favorites,
          }),
        })
      );
    });
  });

  describe("getUserReviews", () => {
    it("should return user's reviews when id found", async () => {
      const userid = 1;
      const userReviews = undefined;
      prisma.film_review = {
        findMany: jest.fn().mockReturnValueOnce(userReviews),
      };

      const result = await usersService.getUserReviews(userid);

      expect(prisma.film_review.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.film_review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            user_id: userid,
          },
        })
      );
      expect(result).toEqual(userReviews);
    });
  });
});
