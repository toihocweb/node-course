const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Todo = require("../models/Todo");
const { ErrorResponse, errorResponse } = require("../response/ErrorResponse");

const createTodo = asyncMiddleware(async (req, res, next) => {
  const { content } = req.body;
  const { email } = req.user;

  const newTodo = new Todo({
    content,
    email,
  });

  await newTodo.save();

  res.status(201).json({
    success: true,
  });
});

const getTodoById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const todo = await Todo.findOne({ _id: id, userId }).populate(
    "userId",
    "-password"
  );

  if (!todo) {
    throw new ErrorResponse(404, "Not found!");
  }

  res.json({
    success: true,
    data: todo,
  });
});

const getTodos = asyncMiddleware(async (req, res, next) => {
  const todos = await Todo.find().populate("userEmail", "-password");
  res.json({
    success: true,
    data: todos,
  });
});

const deleteTodoById = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  await Todo.findByIdAndRemove(id);
  res.json({
    success: true,
  });
});

const updateTodo = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const result = await Todo.findByIdAndUpdate(id, { content }, { new: true });
  res.json({
    success: true,
    result,
  });
});

module.exports = {
  createTodo,
  getTodos,
  deleteTodoById,
  updateTodo,
  getTodoById,
};
