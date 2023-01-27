const { filmsService } = require("../../services");
const { when } = require("jest-when");
const { FilmsController } = require("..");

jest.mock("../../services/films");

describe("FilmsController", () => {
  describe("getFilms", () => {
    it("should return a 200 when films are available", async () => {
      const films = [{ id: 1 }];
      filmsService.getFilms.mockReturnValueOnce(films);

      const req = {};

      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await FilmsController.getFilms(req, res);

      expect(filmsService.getFilms).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(films);
    });
  });

  describe("getFilmsById", () => {
    it("should return a 200 when a film is available", async () => {
      const id = 1;
      const films = [{ id: 1 }];

      when(filmsService.getById).calledWith(id).mockReturnValueOnce(films);
      const req = {
        params: {
          id: id,
        },
      };
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await FilmsController.getById(req, res);

      expect(filmsService.getById).toHaveBeenCalledWith(id);
      expect(filmsService.getById).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(films);
    });
  });

  describe("getFilmsActors", () => {
    it("should return a 200 when actors for a film are available", async () => {
      const id = 1;
      const actors = [{ id: 1 }];

      when(filmsService.getActors).calledWith(id).mockReturnValueOnce(actors);

      const req = {
        params: {
          id: id,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await FilmsController.getActors(req, res);

      expect(filmsService.getActors).toHaveBeenCalledWith(id);
      expect(filmsService.getActors).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(actors);
    });
  });

  describe("getFilmReviews", () => {
    it("should return a 200 when a reviews for a film are available", async () => {
      const id = 1;
      const reviews = [{ id: 1 }];

      when(filmsService.getFilmReviews)
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

      await FilmsController.getFilmReviews(req, res);

      expect(filmsService.getFilmReviews).toHaveBeenCalledWith(id);
      expect(filmsService.getFilmReviews).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(reviews);
    });
  });

  describe("createFilm", () => {
    it("should return a 201 once a new film is created", async () => {
      const filmName = "test film";
      const synopsis = "test";
      const genre = "testPassword";
      const releaseDate = "1000-11-11";
      const rating = 5.0;
      const imageLocation = "test space";
      const tmdbId = 1111;

      when(filmsService.createFilm).calledWith(
        filmName,
        synopsis,
        genre,
        releaseDate,
        rating,
        imageLocation,
        tmdbId
      );

      const req = {
        body: {
          filmName: filmName,
          synopsis: synopsis,
          genre: genre,
          releaseDate: releaseDate,
          rating: rating,
          imageLocation: imageLocation,
          tmdbId: tmdbId,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);

      await FilmsController.createFilm(req, res);

      expect(filmsService.createFilm).toBeCalledWith(
        filmName,
        synopsis,
        genre,
        releaseDate,
        rating,
        imageLocation,
        tmdbId
      );

      expect(res.status).toBeCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
});
