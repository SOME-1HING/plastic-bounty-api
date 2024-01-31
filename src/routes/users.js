import r from ".";
import { ErrorResponseObject, SuccessResponseObject } from "../common/http.js";
import addUser from "../model/users";

r.post("/users/addUser", (req, res) => {
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
      if (result)
        res.status(200).json(new SuccessResponseObject("User added."));
      else
        res
          .status(203)
          .json(
            new SuccessResponseObject("User already Present in the database.")
          );
    })
    .catch((error) => {
      res.status(200).json(new ErrorResponseObject("Server Error"));
    });
});
