import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./src/routes/index.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { logger } from "./src/utils/logger.js";
import { initDB } from "./src/models/db.js";
import { settings } from "./src/config/settings.js";

const app = express();
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/live-check", (req, res) => {
  logger.info("Info. Got live check request");
  res.sendStatus(200);
});

// show how to add v1 prefix
app.use("/v1", routes);

app.use(errorHandler);

app.listen(settings.port, () => {
  console.log(`TODO app listening on port ${settings.port}!`);
  initDB(settings.mongoHost);
});
