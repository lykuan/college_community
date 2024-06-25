import { TUser } from "./types/User"
import { Schema, model, Types } from "mongoose"
const userSchema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    last_seen: { type: Date, default: Date.now },
    posts: [{ type: Types.ObjectId, ref: "Story" }],
    followers: [{ type: Types.ObjectId, ref: "User" }],
    followed: [{ type: Types.ObjectId, ref: "User" }],
    bookmarks:[{ type: Types.ObjectId, ref: "Story" }],
    tasks:[{ type: Types.ObjectId, ref: "Task" }],
    reputation: Number,
    dating: { type: Types.ObjectId, ref: "Dating" },
    is_delete: { type: Boolean, default: false },
    profile: {
      username: {
        type: String,
        unique: true,
        trim: true,
        text: true,
        default: "",
      },
      university: { type: String, default: "" },
      academy: { type: String, default: "" },
      major: { type: String, default: "" },
      name: { type: String, default: "" },
      avatar: { type: String, default: "" },
      bio: { type: String, default: "", trim: true },
      age: { type: Number, trim: true },
      gender: { type: String, enum: ["0", "1"], default: "0" },
      address: {
        province: { type: String, trim: true, default: "" },
        city: { type: String, trim: true, default: "" },
      },
    },
  },
  { timestamps: true }
)

export const userModel = model<TUser>("User", userSchema)
