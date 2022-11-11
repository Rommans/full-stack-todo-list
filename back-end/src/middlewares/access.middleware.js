import { HTTPError } from "../utils/HttpError.js";
import { Todos } from "../models/todoMogo.model.js";

export function shouldHaveRole(role) {
  return (req, res, next) => {
    if (!req.user.hasRole(role)) {
      throw new HTTPError("Forbidden", 403);
    }
    next();
  };
}

export function ownerMiddleware(req, res, next) {
  const id = req.user.id;
  const [todos] = [
    Todos.find({
      $or: [{ owner: id }, { sharedWith: id }],
    })
  ];
  console.log(todos.tree)
  next();
}
