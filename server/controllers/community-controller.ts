import { NextFunction, Request, Response } from "express"
import { CommunityModel } from "model/Community"

export const createCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user._id
    console.log(req.body)
    const { name, description } = req.body
    if (await CommunityModel.findOne({ name: name }))
      return res.json({ success: false, message: "该社区已经创建" })
    const result = await CommunityModel.create({
      name,
      description,
      creator: currentUser,
    })
    if (result) {
      result.members.push(currentUser)
      result.save()
      res.status(201).json({ success: true, message: "社区创建成功" })
    } else {
      res.json({ success: false, message: "社区创建失败，请重试" })
    }
  } catch (error) {}
}

export const fetchAllCommunities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {}
export const fetchCommunitiesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.params.uid
  const result = await CommunityModel.find({
    $or: [{ members: { $in: user } }, { creator: user }],
  })
  res.status(200).json(result)
}

export const joinCommunity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = req.user._id
  const community = req.params.cid
  try {
  const result = await CommunityModel.findById({ _id: community })
  if(!result) return res.json({success:false,message:"社区不存在"})
  if (result.members.includes(currentUser)) {
    result.members = result.members.filter((user) => {
      return user.toString() != currentUser
    })
    if (result.members.length == 0) {
      await CommunityModel.deleteOne({ _id: result._id })
      return res.json({message:"社区已销毁"})
    }
    result.save()
    res.json(result)
  }
  result.members.push(currentUser)
  result.save()
  res.json(result)
  } catch (error) {
    console.log(error)
  }
}
