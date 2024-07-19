const Users = require("../models/user.model");
const BookIssueData = require("../models/issue.model");

// desc: Get all users
// route: /users
// method: GET
const getUsers = async (req, resp) => {
  try {
    let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
    const skip = (page - 1) * limit;
    const totalUsers = await Users.countDocuments();
    const users = await Users.find({ role: { $ne: "admin" } }).skip(skip).limit(limit);
    if (users) {
      resp.status(200).send({
        status: 200,
        result: "Success",
        message: "get 10 users.",
        meta: {
          page: page,
          limit: limit,
          totalUsers: totalUsers,
        },
        data: users,
      });
    } else {
      resp.status(404).send({
        status: 404,
        result: "Success",
        message: "No user found in the Record.",
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

// desc: Get single users
// route: /user/:key
// method: GET
const getUser = async (req, resp) => {
	try {
		const user = await Users.findOne({ id: req.params.key });
		if (user) {
		let { page, limit } = req.query;
    if (!page) page = 1;
    if (!limit) limit = 10;
		const skip = (page - 1) * limit;
    const totalBooks = await BookIssueData.countDocuments({ issued_to: req.params.key });
			const issueData = await BookIssueData.find({ issued_to: req.params.key }).skip(skip).limit(limit);
      resp.status(200).send({
        status: 200,
        result: "Success",
        message: "Get User data",
				meta: {
          page: page,
          limit: limit,
          totalBooks: totalBooks,
        },
        data: {
					user,
					issueData
				},
      });
		} else {
      resp.status(404).send({
        status: 404,
        result: "Success",
        message: "No user found in the Record.",
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

// desc: Get single users
// route: user/username/:key
// method: GET
const getUserName = async (req, resp) => {
	try {
		const user = await Users.findOne({ id: req.params.key });
		if(user) {
			resp.status(200).send({
				status: 200,
        result: "Success",
        message: "Get User data",
        data: user.name
			});
		} else {
			resp.status(404).send({
				status: 404,
        result: "Success",
        message: "not found",
        data: {}
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
}

module.exports = {
  getUsers,
	getUser,
	getUserName
};
