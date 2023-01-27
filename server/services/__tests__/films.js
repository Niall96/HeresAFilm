const filmsService = require("../films");
const prisma = require("../../utils/prisma");
const { when } = require("jest-when");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("filmsService", () => {
  describe("getFilms", () => {
    it("should return films when films found", async () => {
      const films = [{ id: 1 }];
      prisma.film = { findMany: jest.fn().mockReturnValueOnce(films) };

      const result = await filmsService.getFilms();

      expect(prisma.film.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(films);
    });
  });

  describe("getFilmsbyId", () => {
    it("should return films when id found", async () => {
      const filmId = 1;
      const film = {};
      prisma.film = { findUnique: jest.fn().mockReturnValueOnce(film) };

      const result = await filmsService.getById(filmId);

      expect(prisma.film.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.film.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: filmId,
          },
        })
      );
      expect(result).toEqual(film);
    });
  });

  describe("createFilm", () => {
    it("should return film when created", async () => {
      const filmName = "test";
      const synopsis = "test";
      const genre = "genre";
      const releaseDate = "1000-00-00";
      const rating = 7.5;
      const imageLocation = "test";
      const tmdbId = 11111;

      const expectedResult = {
        filmName,
        synopsis,
        genre,
        releaseDate,
        rating,
        imageLocation,
        tmdbId,
      };

      prisma.film = {
        create: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await filmsService.createFilm(
        filmName,
        synopsis,
        genre,
        releaseDate,
        rating,
        imageLocation,
        tmdbId
      );

      expect(prisma.film.create).toHaveBeenCalledTimes(1);
      expect(prisma.film.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            film_name: filmName,
            synopsis: synopsis,
            genre: genre,
            release_date: releaseDate,
            rating: rating,
            image_location: imageLocation,
            tmdb_id: tmdbId,
          }),
        })
      );
    });
  });

  describe("getFilmReviews", () => {
    it("should return film's reviews when id found", async () => {
      const filmId = 1;
      const filmReviews = undefined;
      prisma.film_review = {
        findMany: jest.fn().mockReturnValueOnce(filmReviews),
      };

      const result = await filmsService.getFilmReviews(filmId);

      expect(prisma.film_review.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.film_review.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            film_id: filmId,
          },
        })
      );
      expect(result).toEqual(filmReviews);
    });
  });

  describe("getFilmActors", () => {
    it("should return film's actors when id found", async () => {
      const filmId = 1;
      const filmActors = undefined;
      prisma.film_actors = {
        findMany: jest.fn().mockReturnValueOnce(filmActors),
      };

      const result = await filmsService.getActors(filmId);

      expect(prisma.film_actors.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.film_actors.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            film_id: filmId,
          },
        })
      );
      expect(result).toEqual(filmActors);
    });
  });
});
