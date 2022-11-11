import { Users } from "../models/user.model.js";
import { Todos } from "../models/todoMogo.model.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class AdminMongoRepository {
  async getAllUsers({ limit, page }) {
    const users = await Users.find({})
      .skip(limit * page)
      .limit(limit)
    return users;
  }

  async getCountUsers() {
    logger.info('AdminRepository. Get getCountUsers request');
    return Users.countDocuments({});
  }

  async getUserById(id) {
    logger.info(`AdminRepository. Get getUserById request id=${id}`);
    const user = await Users.findOne({ _id: id });
    if (!user) {
      throw new HTTPError("NotFound", 404);
    }
    return user;
  }

  async getTodoByIdAdmin(id) {
    logger.info(`AdminRepository. Get getTodoByIdAdmin request id=${id}`);
    const todo = await Todos.findOne({ _id: id });
    if (!todo) {
      throw new HTTPError("NotFound", 404);
    }
    return todo;
  }

  async updateUser(id, user) {
    logger.info(`AdminRepository. Update user request id=${id}`, { user });
    return Users.findByIdAndUpdate(id, user, { new: true })
  }

  async updateTodo(id, user) {
    logger.info(`AdminRepository. Update todo request id=${id}`, { user });
    return Todos.findByIdAndUpdate(id, user, { new: true })
  }

  async deleteOneUser(id) {
    logger.info(`AdminRepository. Delete user request id=${id}`);
    await Todos.deleteMany({ owner: id })
    return Users.deleteOne({ _id: id });
  }

  async getCountTodos() {
    logger.info('AdminRepository. Get getCountTodos request');
    return Todos.countDocuments({});
  }

  async getAllTodos({ limit, page }) {
    logger.info('AdminRepository. Get getAllTodos request');
    const todos = await Todos.find({})
      .skip(limit * page)
      .limit(limit)
      .populate({ path: "owner" })
      .populate({ path: "sharedWith" });
    return todos;
  }
  
  async deleteOneTodo(id) {
    logger.info(`AdminRepository. Delete deleteOneTodo request id=${id}`);
    return Todos.deleteOne({ _id: id });
  }
}

export const adminMongoRepository = new AdminMongoRepository();
