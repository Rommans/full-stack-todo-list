import { createLogger, format, transports } from "winston";
import logdnaWinston from "logdna-winston";
import { settings } from "../config/settings.js";

const { combine } = format;

export const logger = createLogger({
  level: "info",
  format: combine(format.json()),
});

logger.add(new transports.Console());

if (settings.logdnaKey) {
  logger.add(new logdnaWinston({ key: settings.logdnaKey }));
}
