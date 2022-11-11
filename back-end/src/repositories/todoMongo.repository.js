import { Todos } from "../models/todoMogo.model.js";
import { HTTPError } from "../utils/HttpError.js";
import { logger } from "../utils/logger.js";

class TodoMongoRepository {
  async getOwnOrSharedTodoById(id, user) {
    const todo = await Todos.findOne({
      $and: [
        { _id: id },
        { $or: [{ owner: user._id }, { sharedWith: user._id }] },
      ],
    })
      .populate({ path: "owner" })
      .populate({ path: "sharedWith" });
    if (!todo) {
      throw new HTTPError("NotFound", 404);
    }
    return todo;
  }
  async getTodoById() {
    return Todos.findOne({ _id: id });
  }
  async getOwnTodoById(id, user) {
    const todo = await Todos.findOne({
      $and: [{ _id: id }, { owner: user._id }],
    });
    if (!todo) {
      throw new HTTPError("NotFound", 404);
    }
    return todo;
  }
  async getAll({ limit, page }, userId) {
    logger.info(`TodoRepository. Got getAll request id=${userId}`);
    const todos = await Todos.find({
      $or: [{ owner: userId }, { sharedWith: userId }],
    })
      .skip(limit * page)
      .limit(limit)
      .populate({ path: "owner" })
      .populate({ path: "sharedWith" });
    return todos;
  }
  async searchByText(text) {
    const searchText = new RegExp(`.*${text}.*`);

    return Todos.find({ text: { $regex: searchText, $options: "i" } });
  }
  async getCount(id) {
    return Todos.countDocuments({
      $or: [{ owner: id }, { sharedWith: id }],
    });
  }
  async create(object) {
    logger.info(`TodoRepository. Create todo request`, object);
    const todo = new Todos(object);
    await todo.save();

    return todo.getPublickTodo();
  }
  async deleteOne(id) {
    logger.info(`TodoRepository. Got deleteOne request id=${id}`);
    return Todos.deleteOne({ _id: id });
  }

  async update(id, todo) {
    logger.info(`TodoRepository. Update todo request id=${id}`, { todo });
    return Todos.findByIdAndUpdate(id, todo, { new: true })
      .populate({ path: "owner" })
      .populate({ path: "sharedWith" });
  }

  async shareTodo(id, userId) {
    logger.info(`TodoRepository. Got shareTodo request todo id=${id}`, { userId });
    const todo = Todos.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { sharedWith: userId } },
      { new: true }
    );
    return todo;
  }
}

export const todoMongoRepository = new TodoMongoRepository();
