const { getTodoList, createTodo, editTodo, deleteTodo } = require('../services/todoService');
const load = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }
    const data = await getTodoList(userId);
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
const create = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }
    const data = await createTodo(req.body);
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}
const edit = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { content } = req.body;
    if (!userId) {
      return res.status(401).json({
        message: "User ID is required",
      });
    }
    const data = await editTodo(todoId, content);
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}
const remove = async (req, res) => {
  try {
    const todoId = req.params.id;
    if (!todoId) {
      return res.status(401).json({
        message: "Todo ID is required",
      });
    }
    const data = await deleteTodo(todoId);
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
}
module.exports = {
  load, create, edit, remove
};