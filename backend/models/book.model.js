const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    book_id: {
      type: Number,
      required: [true, "Book id is a required field."],
      unique: [true, "Book id must be unique."],
      index: true,
    },
    book_title: {
      type: String,
      required: [true, "Book title is a required field."],
      minlength: 3,
    },
    type: {
      type: String,
    },
    quantity: {
			type: Number,
			min: 1,
		},
		author_name: {
			type: String,
			required: [true, "Auther name is required."]
		},
		price: {
			type: Number,
		},
		published_year: {
			type: Number,
		}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", bookSchema);
