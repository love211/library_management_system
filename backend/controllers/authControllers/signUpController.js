const Users = require("../../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// desc: Register a user
// route: /auth/signup
// method: POST
const userRegistration = async (req, resp) => {
  try {
    const bodyLength = Object.keys(req.body)?.length;
    if (req.body && bodyLength > 0) {
      const highestUserId = await Users.findOne({}, "id").sort("-id");
      const nextUserId = highestUserId ? highestUserId.id + 1 : 1;
      let password = req.body.data.password;
      password = await bcrypt.hash(password, 10);
      let user = new Users({ ...req.body.data, id: nextUserId, password });
      user = await user.save();
      user = user.toObject();
      delete user.password;
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      resp.status(201).send({
        status: 201,
        result: "Success",
        message: "User has successfully registered.",
        meta: { token: token },
        data: user,
      });
    } else {
      resp.status(400).send({
        status: 400,
        result: "Success",
        message: "User registration validation Failed.",
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

module.exports = { userRegistration };
