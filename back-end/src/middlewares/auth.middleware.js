import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";
import { authService } from "../services/auth.service.js";

export function authMiddlevare(req, res, next) {
  logger.info("Authentication request", { token: req.headers.authorization });

  authService
    .getUserAndValidateToken(`${req.headers.authorization}`)
    .then((user) => {
      logger.info("Authentication request passed", { userId: user.id });
      req.user = user;
      next();
    })
    .catch((e) => {
      logger.error("Authentication error on authService.getUser", {
        message: e.message,
      });
      const error = new HTTPError("Unauthorized", 401);
      next(error);
    });
}
