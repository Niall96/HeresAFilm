const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../constants/auth");

const handleTest = (res, next) => {
  res.locals.user = 1;
  return next();
};

const verifyToken = async (req, res, next) => {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);
  if ((req.path === "/auth" || req.path === "/users") && req.method == "POST")
    return next();

  const splitAuth = req.headers.authorization?.split(" ");
  const token = splitAuth && splitAuth.length >= 2 && splitAuth[1];

  if (token) {
    try {
      const tokenVerified = checkTokenValidity(
        token,
        req.path === "/auth/refresh"
          ? REFRESH_TOKEN_SECRET
          : ACCESS_TOKEN_SECRET
      );

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;
        return next();
      }
    } catch {
      return res.status(401).json({
        error: "Access not Permitted!",
      });
    }
  }
  res.status(401).json({
    error: "Access not Permitted!",
  });
};

const checkTokenValidity = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  verifyToken,
};
