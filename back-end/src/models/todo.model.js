import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';

class TodoModel {
    constructor(dataHolder) {
        this.data = dataHolder;
    }
    create({text}) {
        const id = uuidv4();
        const date = Date.now();
        this.data.set(id, {id, text, isCompleted: false, createdAt: date, updatedAt: date,});

        return this.data.get(id);
    }

    getAll() {
        return [...this.data.values()];
    }

    getById(id) {
        return this.data.get(id);
    }

    delete(id) {
        return this.data.delete(id);
    }
    update(id, data) {
        logger.info(`TodoModel. Update todo request id=${id}`, {data})
        
        const todo = this.data.get(id);
        logger.info(`TodoModel. Got todo from DB`, {todo})

        this.data.set(id, {
            ...todo,
            ...data,
            updatedAt: Date.now()
        })
        const newTodo = this.data.get(id);
        logger.info(`TodoModel. Todo updated`, {newTodo})

        return newTodo;
    }
}

export const todoModel = new TodoModel(new Map());