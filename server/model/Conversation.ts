import { Types, Schema, model } from "mongoose"

const conversationSchema = new Schema(
  {
    members: [{ type: Types.ObjectId, ref: "User" }],
    messages: [{ type: Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
)

export const ConversationModel = model("Conversation", conversationSchema)
