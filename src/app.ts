require("dotenv").config();

import express from "express";
import config from "config";
import connectToDb from "./utils/dbConnection";
import log from "./utils/logger";

const app = express();

const PORT = config.get("port");

app.listen(PORT, () => {
  log.info(`App started at http://localhost:${PORT}`);
  connectToDb();
});
