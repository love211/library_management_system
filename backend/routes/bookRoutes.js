const express = require("express");
const {
  createBook,
  getBooks,
  deleteBook,
  updateBook
} = require("../controllers/bookController");

const router = express.Router();

router.route("/create").post(createBook);
router.route("/getAll").get(getBooks);
router.route("/delete/:key").delete(deleteBook);
router.route("/update/:key").put(updateBook);

module.exports = router;