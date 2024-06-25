import { Types, Schema, model } from "mongoose"

const TaskBoardSchema = new Schema(
  {
    topic: { type: String, required: true },
    tasks: [{ type: Types.ObjectId, ref: "Task" }],
    createdBy: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
)

export const TaskBoardModel = model("TaskBoard", TaskBoardSchema)
