const { Router } = require("express");
const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { addUserRouter } = require("./users");

const r = Router();

r.get("/", (req, res) =>
  res
    .status(200)
    .json(
      new SuccessResponseObject(
        "https://github.com/SOME-1HING/google-reverse-image-api"
      )
    )
);

r.get("/users/addUser", (req, res) => {
  addUserRouter(res, req);
});

module.exports = r;
