const { authService } = require("../services");

async function authenticate(req, res) {
  const { emailAddress, password } = req.body;
  const tokens = await authService.authenticate(emailAddress, password);

  if (!tokens) {
    return res.sendStatus(401);
  }
  res.status(200).json(tokens);
}

async function refresh(req, res) {
  const authenticationTokens = await authService.refresh(res.locals.user);
  res.status(200).json(authenticationTokens);
}

module.exports = {
  authenticate,
  refresh,
};
