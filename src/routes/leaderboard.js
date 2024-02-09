const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { getLeaderboard } = require("../db/leaderboard");

const getLeaderboardRouter = (res, req) => {
  getLeaderboard()
    .then((result) => {
      res.status(200).json(new SuccessResponseObject("Leaderboard", result));
    })
    .catch((err) => {
      res.status(500).json(new ErrorResponseObject(err.message));
    });
};

module.exports = { getLeaderboardRouter };
