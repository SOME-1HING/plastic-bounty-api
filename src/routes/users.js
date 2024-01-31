const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const addUser = require("../db/users.js");

const addUserRouter = (res, req) => {
  addUser
    .addUser(
      req.body.uid,
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.email,
      req.body.profile_pic,
      req.body.badges,
      req.body.points
    )
    .then((result) => {
      if (result) {
        res
          .status(200)
          .json(new SuccessResponseObject("User added successfully"));
      } else {
        res.status(400).json(new SuccessResponseObject("User already exists"));
      }
    })
    .catch((err) => {
      res.status(500).json(new ErrorResponseObject(err.message));
    });
};

module.exports = { addUserRouter };
