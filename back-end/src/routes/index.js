import express from "express";
import todos from "./todos.js";
import auth from "./auth.js";
import admin from "./admin.js";

const router = express.Router();

router.use("/todos", todos);
router.use("/auth", auth);
router.use("/admin", admin);

export default router;
