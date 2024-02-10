const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { getStats } = require("../db/stats");

const getStatsRouter = (res, req) => {
  getStats()
    .then((result) => {
      if (result)
        res
          .status(200)
          .json(
            new SuccessResponseObject("Tickets Fetched Successfully", result)
          );
      else
        res.status(400).json(
          new SuccessResponseObject(
            "Unable to fetch tickets from the database",
            {
              userCount: 0,
              activeTicketCount: 0,
              closedTicketCount: 0,
            }
          )
        );
    })
    .catch((err) => {
      res.status(500).json(new ErrorResponseObject(err.message, []));
    });
};

module.exports = { getStatsRouter };
