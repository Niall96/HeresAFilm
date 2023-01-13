const { Router } = require("express");

const router = Router();

router.get("/", function (req, res) {
  res.send("Jiggle Jiggle");
});
module.exports = router;
