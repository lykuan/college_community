import { Types, Schema, model } from "mongoose"

const messageSchema = new Schema(
  {
    sender: { type: Types.ObjectId, ref: "User" },
    receiver: { type: Types.ObjectId, ref: "User" },
    type: { type: String, default: "text" },
    body: { type: String, require: true },
  },
  { timestamps: true }
)

export const MessageModel = model("Message", messageSchema)
