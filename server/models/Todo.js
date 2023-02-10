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
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Todo", todoSchema);
