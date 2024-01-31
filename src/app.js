import express from "express";
import { json } from "express";
import { ErrorResponseObject } from "./common/http.js";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use("/", routes);

app.all("*", (req, res) =>
  res.status(404).json(new ErrorResponseObject("route not defined"))
);

app.listen(PORT, () =>
  console.log(`server running in http://localhost:${PORT}`)
);
