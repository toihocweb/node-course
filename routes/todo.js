const express = require("express");
const todoController = require("../controllers/todoController");
const todoSchema = require("../validations/todoSchema");
const validator = require("../middlewares/validator");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router.post(
  "/",
  validator(todoSchema.createTodoSchema),
  jwtAuth,
  todoController.createTodo
);

router.get("/", todoController.getTodos);
router.get(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  jwtAuth,
  todoController.getTodoById
);

// dang nhap
router.delete(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  jwtAuth,
  todoController.deleteTodoById
);
router.patch(
  "/:id",
  validator(todoSchema.idSchema, "params"),
  validator(todoSchema.updateTodoSchema),
  todoController.updateTodo
);

module.exports = router;
