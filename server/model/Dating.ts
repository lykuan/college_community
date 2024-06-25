import { Types, Schema, model } from "mongoose"

const DatingSchema = new Schema({
  uid: { type: Types.ObjectId, ref: "User" },
  matched: [{ type: Types.ObjectId, ref: "User" }],
  liked: [{ type: Types.ObjectId, ref: "User" }],
  disliked: [{ type: Types.ObjectId, ref: "User" }],
  images: [String],
  preferUsers: {
    minAge: { type: Number, default: 18 },
    maxAge: { type: Number, default: 50 },
    school: { type: String, default: "" },
    academy: { type: String, default: "" },
    gender: { type: String, enum: ["0", "1"], default: "0" },
    major: { type: String, default: "" },
  },
})

const DatingModel = model("Dating", DatingSchema)

export default DatingModel
