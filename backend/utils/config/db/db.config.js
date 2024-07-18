const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.CONNECTION_STRING);
  console.log("database is connected");
} catch (error) {
  console.log(error);
}
