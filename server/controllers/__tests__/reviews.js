const reviewController = require("../reviews");
const { reviewsService } = require("../../services");
const { when } = require("jest-when");

jest.mock("../../services/reviews");

describe("reviewController", () => {
  describe("createReview_Success", () => {
    it("should return a 201 once the user creates a new review", async () => {
      const userId = 1;
      const filmId = 1;
      const description = "What a fantastic Test";
      const rating = 7.5;

      when(reviewsService.createReview).calledWith(
        userId,
        filmId,
        description,
        rating
      );

      const req = {
        body: {
          userId: userId,
          filmId: filmId,
          description: description,
          rating: rating,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);

      await reviewController.createReview(req, res);

      expect(reviewsService.createReview).toBeCalledWith(
        userId,
        filmId,
        description,
        rating
      );

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });

  describe("createReview_Failed", () => {
    it("should return an error if creating a review fails", async () => {
      reviewsService.createReview.mockRejectedValue(
        new Error("Create Error Failed")
      );
      const userId = "";
      const filmId = "";
      const description = "";
      const rating = "";

      const req = {
        body: {
          userId: userId,
          filmId: filmId,
          description: description,
          rating: rating,
        },
      };

      await expect(
        reviewController.createReview(req, undefined)
      ).rejects.toThrow();

      expect(reviewsService.createReview).toHaveBeenCalledWith(
        userId,
        filmId,
        description,
        rating
      );
    });
  });

  describe("deleteReview_Success", () => {
    it("should return a 200 once the user deletes a review", async () => {
      const id = 1;
      const deletedReview = { id: 1 };

      when(reviewsService.deleteReview)
        .calledWith(id)
        .mockReturnValueOnce(deletedReview);
      const req = {
        params: {
          id: id,
        },
      };

      const res = {};

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      await reviewController.deleteReview(req, res);

      expect(reviewsService.deleteReview).toHaveBeenCalledWith(id);
      expect(reviewsService.deleteReview).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteReview_Failed", () => {
    it("should throw an error if a review fails to delete", async () => {
      reviewsService.deleteReview.mockRejectedValue(
        new Error("Delete Review Failed")
      );

      const id = 1;
      const req = {
        params: {
          id: id,
        },
      };

      await expect(
        reviewController.deleteReview(req, undefined)
      ).rejects.toThrow();

      expect(reviewsService.deleteReview).toHaveBeenCalledWith(id);
    });
  });
});
