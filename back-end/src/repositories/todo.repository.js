import { todoModel } from "../models/todo.model.js";
import { logger } from "../utils/logger.js";

class TodoRepository {
  async getById(id) {
    return todoModel.getById(id);
  }
  async getAll(limip, page) {
    return todoModel.getAll();
  }
  async create(object) {
    logger.info(`TodoRepository. Create todo request`, object);
    return todoModel.create(object);
  }
  async deleteOne(id) {
    return todoModel.delete(id);
  }

  async update(id, todo) {
    logger.info(`TodoRepository. Update todo request id=${id}`, { todo });
    return todoModel.update(id, todo);
  }
}

export const todoRepository = new TodoRepository();
