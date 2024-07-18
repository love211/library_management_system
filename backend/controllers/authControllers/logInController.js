const Users = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// desc: LogIn a user
// route: /auth/login
// method: POST
const getUserAuthentication = async (req, resp) => {
  try {
    const { email, password } = req.body.data;
    if (email && password) {
      let user = await Users.findOne({ email });
      if (user) {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (isPasswordMatched) {
          user = user.toObject();
          delete user.password;
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
          );
          console.log("user", user);
          console.log({
            Status: 200,
            result: "Success",
            message: "User has successfully logged in.",
            meta: { token },
            data: user,
          });
          resp.status(200).send({
            result: "Success",
            message: "User has successfully logged in.",
            meta: { token },
            data: user,
          });
        } else {
          console.log({
            Status: 401,
            result: "Success",
            message: "Worng Credential--Password Not Matched.",
            data: {},
          });
          resp.status(401).send({
            result: "Success",
            message: "Worng Credential--Password Not Matched.",
            data: {},
          });
        }
      } else {
        console.log({
          Status: 404,
          result: "Success",
          message: "Worng Credential--User Not Found.",
          data: {},
        });
        resp.status(404).send({
          result: "Success",
          message: "Worng Credential--User Not Found.",
          data: {},
        });
      }
    } else {
      console.log({
        Status: 400,
        result: "Success",
        message: "Validation Error--email and Password cannot be blank",
        data: {},
      });
      resp.status(400).send({
        result: "Success",
        message: "Validation Error--email and Password cannot be blank",
        data: {},
      });
    }
  } catch (error) {
    console.log({
      Status: 500,
      result: "Failed",
      message: "Internal Server Error",
      specificError: error,
      data: {},
    });
    resp.status(500).send({
      result: "Failed",
      message: "Internal Server Error",
      specificError: error,
      data: {},
    });
  }
};

module.exports = { getUserAuthentication };
