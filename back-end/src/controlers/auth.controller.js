import { authService } from "../services/auth.service.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

export async function getMe(req, res) {
  const { user } = req;

  res.json(user.getPublickProfile());
}

export async function register(req, res) {
  const { firstName, lastName, email, password, confirmPassword, dateOfBirth } =
    req.body;
  logger.info("AuthController. Got register request", {
    firstName,
    lastName,
    email,
    dateOfBirth,
  });
  if (password != confirmPassword) {
    logger.error("AuthController. Confirm password are wrong", {
      firstName,
      lastName,
      email,
      dateOfBirth,
    });
    throw new HTTPError("Confirm password are wrong", 400);
  }
  const user = await authService.register({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
  });
  res.json(user);
}

export async function login(req, res) {
  const { email, password } = req.body;
  logger.info("AuthController. Login request", { email });

  const loginData = await authService.login({ email, password });
  res.json(loginData);
}
