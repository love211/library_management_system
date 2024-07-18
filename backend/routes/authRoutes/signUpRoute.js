const express = require("express");
const {
  userRegistration,
} = require("../../controllers/authControllers/signUpController");

const router = express.Router();

router.route("/").post(userRegistration);

module.exports = router;
