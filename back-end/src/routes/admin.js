import express from "express";
import { register } from "../controlers/auth.controller.js";
import { authMiddlevare } from "../middlewares/auth.middleware.js";
import { shouldHaveRole } from "../middlewares/access.middleware.js";
import { ROLES } from "../models/constants.js";
import { adminController } from "../controlers/admin.controller.js";

const router = express.Router();

//users
router.get("/users", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    if (req.query.email) {
        return adminController.getByEmail(req, res).catch(next)
    }
    if (req.query.filter && parseInt(req.query.limit) && parseInt(req.query.page)) {
        return adminController.getTodoFilter(req, res).catch(next)
    }
    adminController.getListUsers(req, res).catch(next)
});

router.put("/users", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    if (req.query.email) {
        return adminController.getByEmail(req, res).catch(next)
    }
    adminController.getListUsers(req, res).catch(next)
});

router.put("/users/:id", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    adminController.updateUser(req, res).catch(next)
});

router.post("/users/", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    register(req, res).catch(next)
});

router.delete("/users/:id", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    adminController.deleteUser(req, res).catch(next)
});

//todos
router.get("/todos", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    if (req.query.userId) {
        return adminController.getByIdAdmin(req, res).catch(next)
    }
    adminController.getAllTodosAdmin(req, res).catch(next)
});

router.get("/todos/:id", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    adminController.getTodoByIdAdmin(req, res).catch(next)
});

router.delete("/todos/:id", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    adminController.deleteTodoByIdAdmin(req, res).catch(next)
});

router.put("/todos/:id", authMiddlevare, shouldHaveRole(ROLES.ADMIN), async (req, res, next) => {
    adminController.updateTodoAdmin(req, res).catch(next)
});

export default router;
