const express = require("express");

const {
  generateShortLinkURL,
  redirectURL,
  analytics,
} = require("../controller/short-link.controller");

const router = express.Router();

router.post("/", generateShortLinkURL);

router.get("/:shortId", redirectURL);
router.get("/analytics/:shortId", analytics);

module.exports = router;
