import { adminMongoRepository } from "../repositories/adminMongo.repository.js";
import { todoMongoRepository } from "../repositories/todoMongo.repository.js";
import { Todos } from "../models/todoMogo.model.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class AdminService {
  async getAllListUsers({ limit = 10, page = 0 }) {
    logger.info('AdminService. Got getListUsers request');

    const [users, total] = await Promise.all([
        adminMongoRepository.getAllUsers({ limit, page }),
        adminMongoRepository.getCountUsers(),
    ]);

    return {
      data: users.map((user) => user.getPublickBigProfile()),
      limit,
      page: page + 1,
      total,
    };
  }

  async updateUser({ id, userData }) {
    logger.info(`AdminService. Got updateUser user request ${id}`);
    const _user = await adminMongoRepository.getUserById(id);
    if (!_user) {
      logger.warn(
        "AdminService. User not found or user dont have access to edit it"
      );
      throw new HTTPError("Notfound", 404);
    }
    logger.info(`AdminService. Got user from DB ${id}`);

    const newUser = await adminMongoRepository.updateUser(id, userData);
    logger.info(`AdminService. User updated ${id}`);

    return newUser;
  }

  async updateTodoAdmin({ id, todoData }) {
    logger.info(`AdminService. Got updateTodoAdmin request ${id}`);
    const todo = await adminMongoRepository.getTodoByIdAdmin(id);
    if (!todo) {
      logger.warn(
        "AdminService. Todo not found or user dont have access to edit it"
      );
      throw new HTTPError("Notfound", 404);
    }
    logger.info(`AdminService. Got todo from DB ${id}`);

    const newTodo = await adminMongoRepository.updateTodo(id, todoData);
    logger.info(`AdminService. Todo updated ${id}`);

    return newTodo;
  }

  async deleteUser(id) {
    logger.info(`AdminService. Got deleteUser request ${id}`);
    const user = await adminMongoRepository.getUserById(id);
    if (!user) {
      logger.warn(
        "AdminService. Admin not found or user dont have access to edit it"
      );
      throw new HTTPError("Notfound", 404);
    }
    return adminMongoRepository.deleteOneUser(id);
  }

  async getAllTodosAdmin({ limit = 10, page = 0 }) {
    page = page > 0 ? page : 0;
    logger.info(`AdminService. Got getAllTodosAdmin admin request`, { limit, page });
    const [todos, total] = await Promise.all([
      adminMongoRepository.getAllTodos({ limit, page }),
      adminMongoRepository.getCountTodos(),
    ]);

    return {
      data: todos.map((todo) => todo.getPublickTodoWithUsers()),
      limit,
      page: page + 1,
      total,
    };
  }

  async getTodoFilter({ limit = 10, page = 0, filter }) {
    page = page > 0 ? page : 0;
    logger.info(`AdminService. Got getTodoFilter admin request`, { limit, page, filter });
    const todo = await Todos.findOne({ text: filter });
    const todoText = todo.text;
    return {
      todo: todoText,
      limit,
      page,
    };
  }

  async getTodoByIdAdmin({ id }) {
    logger.info(`AdminService. Got getTodoByIdAdmin todo request ${id}`);
    const todo = await adminMongoRepository.getTodoByIdAdmin(id);
    if (!todo) {
      logger.warn(
        "AdminService. User not found or user dont have access to edit it"
      );
      throw new HTTPError("Notfound", 404);
    }
    logger.info(`AdminService. Got todo from DB ${id}`);
    return todo;
  }

  async deleteTodo(id) {
    logger.info(`AdminService. Got deleteTodo request ${id}`);
    const todo = await adminMongoRepository.getTodoByIdAdmin(id);
    if (!todo) {
      logger.warn(
        "AdminService. Todo not found or user dont have access to edit it"
      );
      throw new HTTPError("Notfound", 404);
    }
    return adminMongoRepository.deleteOneTodo(id);
  }

  async getAllTodosByIdAdmin({ limit = 10, page = 0 }, id) {
    page = page > 0 ? page : 0;
    logger.info(`TodoService. Got getAllTodosByIdAdmin request`, { limit, page });
    const [todos, total] = await Promise.all([
      todoMongoRepository.getAll({ limit, page }, id),
      todoMongoRepository.getCount(id),
    ]);

    return {
      data: todos.map((todo) => todo.getPublickTodoWithUsers()),
      limit,
      page: page + 1,
      total,
    };
  }
}

export const adminService = new AdminService();
