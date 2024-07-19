const Books = require("../models/book.model");

// desc: Register a book
// route: /book/create
// method: POST
const createBook = async (req, resp) => {
  try {
    const bodyLength = Object.keys(req.body)?.length;
    if (req.body && bodyLength > 0) {
      const highestBookId = await Books.findOne({}, "id").sort("-id");
      const nextbookId = highestBookId ? highestBookId.id + 1 : 1;
      let book = new Books({ ...req.body.data, book_id: nextbookId });
      book = await book.save();
      resp.status(201).send({
        result: "Success",
        message: "Book has successfully registered.",
        data: book,
      });
    } else {
      resp.status(400).send({
        result: "Success",
        message: "Book registration validation Failed.",
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

// desc: Fetch all books
// route: /book/getAll
// method: GET
const getBooks = async (req, resp) => {
  try {
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;
    const totalBooks = await Books.countDocuments();
    const books = await Books.find().skip(skip).limit(limit);
    if (books) {
      resp.status(200).send({
        result: "Success",
        message: "Book has successfully registered.",
        meta: {
          page: page,
          limit: limit,
          totalBooks: totalBooks,
        },
        data: books,
      });
    } else {
      resp.status(404).send({
        result: "Success",
        message: "No Books found in the Record..",
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

// desc: Fetch single book
// route: /book/getAll
// method: GET
const getBook = async (req, resp) => {
  try {
    const books = await Books.find().skip(skip).limit(limit);
    if (books) {
      resp.status(200).send({
        result: "Success",
        message: "Book has successfully registered.",
        meta: {
          page: page,
          limit: limit,
          totalBooks: totalBooks,
        },
        data: books,
      });
    } else {
      resp.status(404).send({
        result: "Success",
        message: "No Books found in the Record..",
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

// desc: Delete single book
// route: /book/delete/:key
// method: DELETE
const deleteBook = async (req, resp) => {
  try {
    const book = await Books.deleteOne({ id: req.params.key });
    if (book.deletedCount) {
      resp.status(200).send({
        result: "Success",
        message: "Book has successfully deleted.",
        data: book,
      });
    } else {
      resp.status(404).send({
        result: "Success",
        message: "Book not found.",
        data: book,
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

// desc: Delete single book
// route: /book/update/:key
// method: PUT
const updateBook = async (req, resp) => {
	try {
		const book = await Books.updateOne(
			{ id: req.params.key },
			{ $set: req.body }
		);
		if (book.modifiedCount && book.matchedCount) {
      resp.status(200).send({
        result: "Success",
        message: "Book has successfully updated.",
        data: book,
      });
		} else if (book.matchedCount) {
      resp.status(204).send({
        result: "Success",
        message: "Nothing to update.",
        data: book,
      });
		} else {
      resp.status(404).send({
        result: "Success",
        message: "Book not found.",
        data: book,
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


module.exports = {
  createBook,
  getBooks,
	deleteBook,
	updateBook,
};
