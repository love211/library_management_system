const express = require("express");
const {
	getUsers,
	getUser,
	getUserName
} = require("../controllers/userController");

const router = express.Router();

router.route("/").get(getUsers);
router.route("/username/:key").get(getUserName)
router.route("/:key").get(getUser);

module.exports = router;