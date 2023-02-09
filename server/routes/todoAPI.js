import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({});

  return res.status(200).json({
    msg: "Fetched!!!",
    todos,
  });
  console.log(todos);
});

router.post("/add", async (req, res) => {
  let name = req.body.data;

  const todoExist = await Todo.findOne({ name });

  if (todoExist) {
    return res.status(406).json({
      msg: "Todo Already in your List... Please Complete it!!!",
    });
  }
  const todo = new Todo({ name });

  await todo.save();

  console.log(todo);
});

export default router;
