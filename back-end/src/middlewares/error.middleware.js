import { ValidationError } from "express-validation";
import { logger } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  if (err) {
    logger.error("App error:", {
      message: err.message,
      stack: err.stack,
    });
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
    if (!err.status) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    return res.status(err.status).json({
      message: err.message,
    });
  }
  next();
}
