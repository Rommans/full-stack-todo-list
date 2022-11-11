import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export async function initDB(uri, options) {
  logger.info("DB. Start connection to db.");
  const defaults = { useNewUrlParser: true };
  mongoose.connect(`${uri}`, { ...defaults, ...options });
  logger.info("Connected to db");
}
