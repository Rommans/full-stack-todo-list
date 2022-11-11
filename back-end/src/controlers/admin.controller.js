import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";
import { Users } from "../models/user.model.js";
import { adminService } from "../services/admin.service.js";

class AdminController {
  constructor(service, logger) {
    this.service = service;
    this.log = logger;
  }

  async getListUsers(req, res) {
    this.log.info("Got getAllTodos request");
    let { page, limit } = req.query;
    if (page) {
      page = parseInt(page);
    }
    if (limit) {
      limit = parseInt(limit);
    }
    const users = await this.service.getAllListUsers({ page, limit });
    res.json(users);
  }

  async getByEmail(req, res) {
    const email = req.query.email;
    this.log.info("Got getByEmail request", { email: `${email}` });
    if (email.length <= 1) {
      throw new HTTPError("Required minimum 2 symbols", 400);
    }
    const user = await Users.findOne({ email: email });
    if (!user) {
      throw new HTTPError("NotFound", 404);
    }
    res.json(user.getPublickShortProfile());
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const user = req.body;
    this.log.info("Got updateUser request", { id, user });

    const newUser = await this.service.updateUser({
      id,
      userData: user,
    });
    this.log.info("Got updated user", { id, newUser });
    res.json(newUser);
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    this.log.info("Got deleteUser request", { id: `${id}` });
    await this.service.deleteUser(id);
    res.json("User successfully deleted");
  }

  async getAllTodosAdmin(req, res) {
    this.log.info("Got getAllTodosAdmin request");
    let { page, limit } = req.query;
    if (page) {
      page = parseInt(page);
    }
    if (limit) {
      limit = parseInt(limit);
    }
    const todos = await this.service.getAllTodosAdmin({ page, limit });
    res.json(todos);
  }

  async getTodoFilter(req, res) {
    this.log.info("Got getTodoFilter request");
    const { filter, limit, page } = req.query;
    const todoFilter = await this.service.getTodoFilter({ page, limit, filter });
    res.json(todoFilter);
  }

  async getTodoByIdAdmin(req, res) {
    const id = req.params.id;
    this.log.info("Got getTodoByIdAdmin request", { id });

    const todo = await this.service.getTodoByIdAdmin({ id });
    this.log.info("Got todoByIdAdmin todo", { id, todo });
    res.json(todo);
  }

  async deleteTodoByIdAdmin(req, res) {
    const id = req.params.id;
    this.log.info("Got deleteTodoByIdAdmin request", { id: `${id}` });
    await this.service.deleteTodo(id);
    res.json("Todo successfully deleted");
  }

  async getByIdAdmin(req, res) {
    const id = req.query.userId;
    this.log.info("Got getByIdAdmin request", { id: `${id}` });
    let { page, limit } = req.query;
    if (page) {
      page = parseInt(page);
    }
    if (limit) {
      limit = parseInt(limit);
    }
    const todos = await this.service.getAllTodosByIdAdmin({ page, limit }, id);
    res.json(todos);
  }

  async updateTodoAdmin(req, res) {
    const id = req.params.id;
    const todo = req.body;
    this.log.info("Got update request", { id, todo });

    const newTodo = await this.service.updateTodoAdmin({
      id,
      todoData: todo,
    });
    this.log.info("Got updated todo", { id, newTodo });

    res.json(newTodo);
  }
}

export const adminController = new AdminController(adminService, logger);
