const reviewsService = require("../reviews");
const prisma = require("../../utils/prisma");
const { when } = require("jest-when");

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("reviewsService", () => {
  describe("createReview", () => {
    it("should return review when created", async () => {
      const userId = 1;
      const filmId = 1;
      const description = "test desc";
      const rating = 6.0;
      const expectedResult = {
        userId,
        filmId,
        description,
        rating,
      };

      prisma.film_review = {
        create: jest.fn().mockReturnValueOnce(expectedResult),
      };

      await reviewsService.createReview(userId, filmId, description, rating);

      expect(prisma.film_review.create).toHaveBeenCalledTimes(1);
      expect(prisma.film_review.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            user_id: userId,
            film_id: filmId,
            description: description,
            rating: rating,
          }),
        })
      );
    });
  });

  describe("deleteReview", () => {
    it("should delete review with id found", async () => {
      const reviewId = 1;
      const review = {};
      prisma.film_review = { delete: jest.fn().mockReturnValueOnce(review) };

      const result = await reviewsService.deleteReview(reviewId);

      expect(prisma.film_review.delete).toHaveBeenCalledTimes(1);
      expect(prisma.film_review.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: reviewId,
          },
        })
      );
      expect(result).toEqual(review);
    });
  });
});
