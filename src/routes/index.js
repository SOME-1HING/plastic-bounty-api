import { Router } from "express";
import { SuccessResponseObject, ErrorResponseObject } from "../common/http.js";

const r = Router();

export default r;

/*
r.get("/", (req, res) =>
  res
    .status(200)
    .json(
      new SuccessResponseObject(
        "https://github.com/SOME-1HING/google-reverse-image-api"
      )
    )
);

r.post("/reverse", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const result = await reverse(imageUrl);
    if (result["success"]) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("/reverse error:", error);
    res.status(500).json(new ErrorResponseObject("Failed to reverse image"));
  }
});
 */
