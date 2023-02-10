import express from "express";
import Todo from "../models/Todo.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const todos = await Todo.find({}).sort({ createdAt: -1 });

  return res.status(200).json({
    msg: "Fetched!!!",
    todos,
  });
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

  res.status(200).json({
    msg: "TODO Added!!!",
  });
});

router.delete("/delete/:id", async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  console.log(id);

  await Todo.findByIdAndDelete(id);

  res.status(200).json({
    msg: "User Deleted Successfully!!!",
  });
});

router.patch("/edit/:id", async (req, res) => {
  const name = req.body.data;
  const { id } = req.params;
  const updated = await Todo.findByIdAndUpdate(id, {
    name,
  });

  // console.log(updated);
  res.status(200).json({
    msg: "Updated Successfully!!!",
  });
});

router.patch("/status/:id", async (req, res) => {
  let done = req.body;
  console.log(done);
  const { id } = req.params;
  let updated;
  if (done) {
    updated = await Todo.findByIdAndUpdate(id, {
      done: true,
      notDone: false,
    });
  } else {
    updated = await Todo.findByIdAndUpdate(id, {
      done: false,
      notDone: true,
    });
  }

  console.log(updated);
});

export default router;
