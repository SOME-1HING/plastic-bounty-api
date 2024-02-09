const { Router } = require("express");
const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { addUserRouter, getUserRouter } = require("./users");
const { getLeaderboardRouter } = require("./leaderboard");

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

r.post("/users/addUser", (req, res) => {
  addUserRouter(res, req);
});
r.get("/users/getUser", (req, res) => {
  getUserRouter(res, req);
});
r.get("/getLeaderboard", (req, res) => {
  getLeaderboardRouter(res, req);
});

module.exports = r;
