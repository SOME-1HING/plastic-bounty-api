const {
  SuccessResponseObject,
  ErrorResponseObject,
} = require("../common/http");
const { addTicket, getTickets } = require("../db/tickets.js");

const addTicketRouter = (res, req) => {
  addTicket(
    req.body.problem_category,
    req.body.problem_description,
    req.body.latitude,
    req.body.longitude,
    req.body.reporter_id,
    req.body.incident_pic
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

const getTicketsRouter = (res, req) => {
  getTickets()
    .then((result) => {
      if (result)
        res
          .status(200)
          .json(
            new SuccessResponseObject("Tickets Fetched Successfully", result)
          );
      else
        res
          .status(400)
          .json(
            new SuccessResponseObject(
              "Unable to fetch tickets from the database",
              []
            )
          );
    })
    .catch((err) => {
      res.status(500).json(new ErrorResponseObject(err.message, []));
    });
};

module.exports = { addTicketRouter, getTicketsRouter };
