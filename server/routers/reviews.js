const { Router } = require("express");

const router = Router();

router.get("/", function (req, res) {
  res.send("This is some craic knowing this");
});
module.exports = router;
