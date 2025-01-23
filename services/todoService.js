const Todo = require('../models/Todo');

class TodoService {
  async getTodoList(userId) {
    try {
      const list = await Todo.find({ author: userId });
      return {
        list,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async createTodo(author, content) {
    try {
      const todo = await Todo.create({ author, content });
      return { success: true, todo }; // 생성된 데이터 반환
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error; // 컨트롤러에서 에러 처리
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