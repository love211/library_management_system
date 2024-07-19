const BookIssueData = require("../models/issue.model");
const Books = require("../models/book.model");


// desc: Issue a book
// route: /book/issue
// method: POST
const issueBook = async (req, resp) => {
	try {
		const bodyLength = Object.keys(req.body)?.length;
		if (req.body && bodyLength > 0) {
			const highestIssueId = await BookIssueData.findOne({}, "id").sort("-id");
      const nextIssueId = highestIssueId ? highestIssueId.id + 1 : 1;
			let issueEntity = new BookIssueData({ ...req.body.data, id: nextIssueId });
			issueEntity = await issueEntity.save();
			const book = await Books.findOne({ book_id: req.body.data.book_id});
			book.quantity = book.quantity - 1;
			await book.save();
      resp.status(201).send({
        result: "Success",
        message: "Book has successfully issued.",
        data: book,
      });
    } else {
      resp.status(400).send({
        result: "Success",
        message: "Book issue validation Failed.",
        data: {},
      });
		}
	} catch (error) {
    resp.status(500).send({
      result: "Failed",
      message: "Internal Server Error",
      specificError: error,
      data: {},
    });
	}
};

// desc: Issue a book
// route: /book/return/:key
// method: DELETE
const returnBook = async (req, resp) => {
  try {
    const issuedBook = await BookIssueData.deleteOne({ id: req.params.key });
    if (issuedBook.deletedCount) {
			const book = await Books.findOne({ book_id: req.query.book_id});
			book.quantity = book.quantity + 1;
			await book.save();
      resp.status(200).send({
        result: "Success",
        message: "Book has returned.",
        data: issuedBook,
      });
    } else {
      resp.status(404).send({
        result: "Success",
        message: "Book not found.",
        data: issuedBook,
      });
    }
  } catch (error) {
    resp.status(500).send({
      result: "Failed",
      message: "Internal Server Error",
      specificError: error,
      data: {},
    });
  }
};

// desc: Issue a book
// route: /book/return/:key
// method: GET
const issuedBooks = async (req, resp) => {
	try {
		let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
		const skip = (page - 1) * limit;
    const totalBooks = await Books.countDocuments();
		const books = await BookIssueData.find().skip(skip).limit(limit);
		if (books) {
      resp.status(200).send({
        status: 200,
        result: "Success",
        message: "Issued books",
        meta: {
          page: page,
          limit: limit,
          totalBooks: totalBooks,
        },
        data: books,
      });
    } else {
      resp.status(404).send({
        status: 404,
        result: "Success",
        message: "No issued books found in the Record..",
        data: {},
      });
    }
	} catch (error) {
    resp.status(500).send({
      status: 500,
      result: "Failed",
      message: "Internal Server Error",
      specificError: error,
      data: {},
    });
	}
};

module.exports = {
	issueBook,
	returnBook,
	issuedBooks,
};