const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      require: [true, "issue id is a required field."],
      unique: [true, "issue id is a required field."],
      index: true,
    },
    book_title: {
      type: String,
      required: [true, "Book title is a required field."],
      minlength: 3,
    },
    issued_to: {
      type: Number,
      required: [true, "issued_to is a required field."],
    },
    issue_date: {
      type: Date,
      required: [true, "issue date is a required field."],
    },
    return_date: {
      type: Date,
      required: [true, "return date is a required field."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookIssueDatas", issueSchema);
