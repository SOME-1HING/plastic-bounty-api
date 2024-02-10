const { Router } = require("express");
const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { addUserRouter, getUserRouter } = require("./users");
const { getLeaderboardRouter } = require("./leaderboard");
const { addTicketRouter, getTicketsRouter } = require("./tickets");
const { getStatsRouter } = require("./stats");

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
r.post("/tickets/addTicket", (req, res) => {
  addTicketRouter(res, req);
});
r.get("/tickets/getTickets", (req, res) => {
  getTicketsRouter(res, req);
});
r.get("/getLeaderboard", (req, res) => {
  getLeaderboardRouter(res, req);
});
r.get("/getStats", (req, res) => {
  getStatsRouter(res, req);
});

module.exports = r;
