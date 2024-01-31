const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { addUser, getUser } = require("../db/users.js");

const addUserRouter = (res, req) => {
  addUser(
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

const getUserRouter = (res, req) => {
  getUser(req.query.uid)
    .then((result) => {
      if (result)
        res
          .status(200)
          .json(
            new SuccessResponseObject("User is present in the database", result)
          );
      else
        res
          .status(400)
          .json(
            new SuccessResponseObject(
              "User is not present in the database",
              null
            )
          );
    })
    .catch((err) => {
      res.status(500).json(new ErrorResponseObject(err.message));
    });
};

module.exports = { addUserRouter, getUserRouter };
