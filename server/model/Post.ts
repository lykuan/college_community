import { Schema, model, Types } from "mongoose"
import { TPost } from "./types/Post"
import { TComment } from "./types/Comment"
const replySchema = new Schema({
  repliedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  replyBody: {
    type: String,
    trim: true,
  },
  upvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pointsCount: {
    type: Number,
    default: 1,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})
const commentSchema = new Schema<TComment>(
  {
    comment: { type: String, required: true },
    commentedBy: { type: Types.ObjectId, ref: "User" },
    upvotedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [replySchema],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)
const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
      index: true,
      trim: true,
      text: true,
    },
    community: String,
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true },
    cover: { type: String, default: "" },
    rating: [
      { review: Number, uid: { type: Schema.Types.ObjectId, ref: "User" } },
    ],
    viewCount: { type: Number, default: 0 },
    calc_rating: { type: Number, default: 0 },
    upvotedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    downvotedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],

  },
  { timestamps: true }
)

export default model<TPost>("Idea", postSchema)
