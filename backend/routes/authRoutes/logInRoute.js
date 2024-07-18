const express = require("express");
const {
  getUserAuthentication,
} = require("../../controllers/authControllers/logInController");

const router = express.Router();

router.route("/").post(getUserAuthentication);

module.exports = router;
