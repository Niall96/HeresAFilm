const usersService = require("./users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routers/films");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../constants/auth");

async function authenticate(emailAddress, password) {
  const user = await usersService.getUserByEmail(emailAddress);
  if (user) {
    const validPassword = await bcrypt.compare(password, user.user_password);
    if (validPassword) {
      return await generateTokens(user);
    }
  }
}

async function refresh(userId) {
  const user = await usersService.getUserById(userId);
  if (user) {
    return generateTokens(user);
  }
}

function generateTokens(user) {
  const accessToken = jwt.sign({ sub: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: 1200,
  });
  const refreshToken = jwt.sign({ sub: user.id }, REFRESH_TOKEN_SECRET, {
    expiresIn: 120000,
  });
  return { accessToken, refreshToken };
}

module.exports = {
  authenticate,
  refresh,
};
