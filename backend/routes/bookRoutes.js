const express = require("express");
const {
  createBook,
  getBooks,
  deleteBook,
  updateBook
} = require("../controllers/bookController");
const { 
	issueBook, 
	returnBook,
	issuedBooks
} = require("../controllers/issueController");

const router = express.Router();

router.route("/create").post(createBook);
router.route("/getAll").get(getBooks);
router.route("/delete/:key").delete(deleteBook);
router.route("/update/:key").put(updateBook);
router.route("/issue").post(issueBook);
router.route("/return/:key").delete(returnBook);
router.route("/issued").get(issuedBooks);

module.exports = router;