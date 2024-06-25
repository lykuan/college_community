import { Schema, Types, model } from "mongoose"

const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    label: {
      type: String,
      enum: ["life", "study", "exercise"],
      default: "study",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "doing", "done", "backlog`"],
      default: "TODO",
    },
    createdBy: { type: Types.ObjectId },
  },
  { timestamps: true }
)

export const TaskModel = model("Task", TaskSchema)
