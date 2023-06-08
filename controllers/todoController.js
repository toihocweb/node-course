const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
    const { content } = req.body;

    const newTodo = new Todo({
      content,
    });
  
    await newTodo.save();
  
    res.status(201).json({
      success: true,
      user: req.user
    });
}

const getTodos = async(req, res) => {
    const todos = await Todo.find();
    res.json({
      success: true,
      data: todos,
    });
}

const deleteTodoById = async (req, res) => { 
  const { id } = req.params
  await Todo.findByIdAndRemove(id)
  res.json({
    success: true
  })
}

const updateTodo = async (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const result  = await Todo.findByIdAndUpdate(id, { content }, { new: true })
  res.json({
    success: true,
    result
  })
}

module.exports = { 
    createTodo,
    getTodos,
    deleteTodoById,
    updateTodo
}