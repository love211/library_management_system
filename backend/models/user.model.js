const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, "User id is a required field."],
      unique: [true, "User id must be unique."],
      index: true,
    },
    name: {
      type: String,
      required: [true, "User Name is a required field."],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "User e-mail is a required field."],
      unique: [true, "User e-mail must be unique"],
      match: /^\S+@\S+\.\S+$/,
      minlength: 7,
      maxlenght: 60,
    },
    password: {
      type: String,
      required: [true, "Password is a required field."],
      minlength: 6,
    },
    user_role: {
      type: String,
      require: [true, "User Role is a required field."],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
