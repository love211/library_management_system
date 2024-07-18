const Users = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// desc: Register a user
// route: /auth/signup
// method: POST
const userRegistration = async (req, resp) => {
    try {
        const bodyLength = Object.keys(req.body)?.length;
        if(req.body && bodyLength > 0) {
            const highestUserId = await Users.findOne({}, "id").sort("-id");
            // console.log("highest user id", highestUserId.id);
            const nextUserId = highestUserId ? highestUserId.id + 1 : 1;
            console.log("id", nextUserId);
            let password = req.body.data.password;
            password = await bcrypt.hash(password, 10);
            let user = new Users({ ...req.body.data, id: nextUserId, password });
            user = await user.save();
            user = user.toObject();
            delete user.password;
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            console.log("user", user);
            console.log({
                Status: 201,
                result: "Success",
                message: "User has successfully registered.",
                meta : { token: token },
                data: user
            });
            resp.status(201).send({
                result: "Success",
                message: "User has successfully registered.",
                meta : { token: token },
                data: user
            });
        } else {
            console.log({
                Status: 400,
                result: "Success",
                message: "User registration validation Failed.",
                data: {}
            });
            resp.status(400).send({
                result: "Success",
                message: "User registration validation Failed.",
                data: {}
            });
        };
    } catch (error) {
        console.log({
            Status: 500,
            result: "Failed",
            message: "Internal Server Error",
            specificError: error,
            data: {}
        });
        resp.status(500).send({
            result: "Failed",
            message: "Internal Server Error",
            specificError: error,
            data: {}
        });
    };
};

module.exports = { userRegistration };