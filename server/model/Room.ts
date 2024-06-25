import { Schema, Types, model } from "mongoose"
import { TRoom } from "./types/Room"

const roomMessageSchema = new Schema(
  {
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: { type: Types.ObjectId, ref: "Room" },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    is_deleted: Boolean,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  }
)

const roomSchema = new Schema<TRoom>({
  type: { type: String, required: true },
  name: { type: String, required: true, unique: true, trim: true, text: true },
  owner: Types.ObjectId,
  users: [{ type: Types.ObjectId, ref: "User" }],
  messages: [roomMessageSchema],
  is_delete: { type: Boolean, default: false },
})

export const Room = model<TRoom>("Room", roomSchema)
