const authController = require("../auth");
const { authService } = require("../../services");
const { when } = require("jest-when");

jest.mock("../../services/auth");

describe("authController", () => {
  describe("authenticate_Success", () => {
    it("should return 200 Response when member authenticated", async () => {
      // arrange
      const emailAddress = "";
      const password = "";

      when(authService.authenticate)
        .calledWith(emailAddress, password)
        .mockReturnValueOnce({ accessToken: "test", refreshToken: "test" });

      const req = {
        body: {
          emailAddress: emailAddress,
          password: password,
        },
      };

      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);

      // act
      await authController.authenticate(req, res);

      // assert
      expect(authService.authenticate).toHaveBeenCalledWith(
        emailAddress,
        password
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          accessToken: "test",
          refreshToken: "test",
        })
      );
    });
  });
  describe("Authenticate_Failed", () => {
    it("should return 401 Response when member fails authentication", async () => {
      // arrange
      const emailAddress = "";
      const password = "";

      when(authService.authenticate)
        .calledWith(emailAddress, password)
        .mockReturnValueOnce({ accessToken: "test", refreshToken: "test" });

      const req = {
        body: {},
      };

      const res = {
        sendStatus: jest.fn(),
      };
      res.json = jest.fn().mockReturnValue(res);

      // act
      await authController.authenticate(req, res);

      // assert
      expect(authService.authenticate).toHaveBeenCalledWith(
        emailAddress,
        password
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });
  });
});
