import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
    },
    notDone: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("todo", todoSchema);
