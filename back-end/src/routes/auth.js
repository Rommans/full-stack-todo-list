import express from "express";
import { register, login, getMe } from "../controlers/auth.controller.js";
import { authMiddlevare } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", async (req, res, next) =>
  register(req, res).catch(next)
);

router.post("/login", async (req, res, next) => 
  login(req, res).catch(next)
);

router.get("/me", authMiddlevare, async (req, res, next) =>
  getMe(req, res).catch(next)
);

export default router;
