import mongoose from "mongoose";

import Todo from "./Todo.js";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todo: {
      type: [Schema.Types.ObjectId],
      ref: "Todo",
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("User", userSchema);
