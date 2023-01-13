const { Router } = require("express");

const router = Router();

router.get("/", function (req, res) {
  res.send("Colin Farrell is some pup");
});
module.exports = router;
