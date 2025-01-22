const Todo = require('../models/Todo');

class TodoService {
  async getTodoList(author) {
    try {
      const list = await Todo.find({ author });
      return {
        success: true,
        data: list,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async createTodo(userId, content) {
    try {
      await Todo.create({ userId, content });
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
  async editTodo(id, content) {
    try {
      await Todo.findByIdAndUpdate(id, { content });
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTodo(id) {
    try {
      await Todo.findByIdAndDelete(id);
      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new TodoService();