import { Request, Response } from "express"
import { userModel } from "../model/User"
import { logger } from "../utils/logger"
import { encryptPassword } from "utils/helper"
import { TaskModel } from "model/Task"
import PostModel from "model/Story"
const model = new userModel().$model()
export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const filename = req.file?.filename
    const avatarUrl = `${process.env.STATIC_URL}/uploads/profile/${filename}`
    const result = await model.findOneAndUpdate(
      { email: req.user?.email },
      { "profile.avatar": avatarUrl },
      { new: true }
    )
    console.log(result)
    if (result) {
      if (req.user)
        logger.child({ user: req.user?.email }).info("updated avatar")
      res
        .status(200)
        .json({ user: result, message: "update avatar succuessfully" })
    } else res.status(400).send("update avatar failed")
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const newProfile = req.body
    if (newProfile.newPassword)
      newProfile.newPassword = encryptPassword(newProfile.newPassword)
    const result = await model.findOneAndUpdate(
      { email: req.user?.email },
      {
        email: newProfile.email,
        password: newProfile.newPassword,
        "profile.username": newProfile.username,
        "profile.bio": newProfile.bio,
        "profile.age": newProfile.age,
        "profile.gender": newProfile.gender,
        "profile.address.province": newProfile.province,
        "profile.address.city": newProfile.city,
        "profile.university": newProfile.university,
        "profile.academy": newProfile.academy,
        "profile.major": newProfile.major,
      },
      { new: true }
    )
    if (result) {
      const { ...baseUser } = result as any
      const { password, ...userBaseInfo } = baseUser["_doc"]
      res.status(200).json({
        success: true,
        message: "updated user profile successfully",
        data: userBaseInfo,
      })
    } else {
      res.status(400).send("updated user profile failed")
    }
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}
export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const result = await userModel.find(
      { _id: { $ne: currentUser } },
      { email: 1, "profile.username": 1, "profile.avatar": 1 }
    )
    res.status(200).json(result)
  } catch (error) {
    console.log("a error occured in fetchUsers controller", error.message)
    res.status(500).send("服务器故障")
  }
}
export const followedUser = async (req: Request, res: Response) => {
  const currentUser = req.user._id
  const followed = req.params.uid
  const result = await userModel.findById({ _id: currentUser })
  if (result.followed.includes(followed)) {
    result.followed = result.followed.filter((user) => user != followed)
    await result.save()
    const followedUser = await userModel.findByIdAndUpdate(
      { _id: followed },
      { $pull: { followers: currentUser } },
      { new: true }
    )
    return res.json(followedUser)
  }
  result.followed.push(followed)
  await result.save()
  const followdUser = await userModel.findByIdAndUpdate(
    { _id: followed },
    { $push: { followers: currentUser } },
    { new: true }
  )
  res.json(followdUser)
}

export const fetchUserProfile = async (req: Request, res: Response) => {
  try {
    const uid = req.params.uid
    const results = await Promise.all([
      PostModel.find({ author: uid })
        .populate("author")
        .populate({ path: "comments.commentBy", select: "profile" }),
      PostModel.find({ bookmark: { $in: uid } })
        .populate("author")
        .populate({ path: "comments.commentBy", select: "profile" }),
      TaskModel.find({ createdBy: uid }),
      userModel
        .find({ _id: uid })
        .populate({ path: "followers" })
        .populate("followed"),
    ])
    res.json(results)
  } catch (error) {}
}
