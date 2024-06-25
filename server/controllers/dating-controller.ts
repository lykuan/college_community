import { Request, Response } from 'express'
import DatingModel from 'model/Dating'
import { handleFilesAccess } from 'utils/helper'
export const getRecommendUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const currentUserDating = await DatingModel.findOne({ uid: currentUser })
    const dislikeUsers = currentUserDating.disliked
    const likeUsers = currentUserDating.liked
    const recommendUsers = await DatingModel.aggregate([
      { $project: { preferUsers: 1, uid: 1, images: 1 } },
      {
        $addFields: {
          dating: { images: '$images', preferUsers: '$preferUsers' },
        },
      },
      {
        $match: {
          $and: [{ uid: { $nin: dislikeUsers } }, { uid: { $nin: likeUsers } }, { uid: { $ne: currentUser } }],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'uid',
          foreignField: '_id',
          as: 'profile',
          pipeline: [{ $replaceRoot: { newRoot: '$profile' } }],
        },
      },
      { $unwind: { path: '$profile' } },
      { $sample: { size: 6 } },
    ])
    if (recommendUsers) {
      return res.status(200).json({ success: true, recommendUsers })
    } else return res.status(400).json({ success: false, message: '查询失败，请稍后再试' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const likeUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const likedUser = req.params.uid
    const likedUserLiked = await DatingModel.findOne({ uid: likedUser })
    let result
    if (likedUserLiked.liked.includes(currentUser)) {
      result = await DatingModel.findOneAndUpdate({ uid: currentUser }, { $push: { liked: likedUser, matched: likedUser } }, { new: true })
      likedUserLiked.matched.push(currentUser)
      await likedUserLiked.save()
      return res
        .status(200)

        .json({ success: true, message: 'liked', data: result })
    }
    result = await DatingModel.findOneAndUpdate({ uid: currentUser }, { $push: { liked: likedUser } }, { new: true })
    if (result) res.status(200).json({ success: true, message: 'liked', data: result })
    else res.status(400).json({ success: false, message: 'failed to like' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const dislikeUser = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const dislikedUser = req.params.uid
    const result = await DatingModel.findOneAndUpdate({ uid: currentUser }, { $push: { disliked: dislikedUser } }, { new: true })
    if (result) res.status(200).json({ success: true, message: 'liked', data: result })
    else res.status(400).json({ success: false, message: 'failed to like' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateDatingSetting = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const medias = handleFilesAccess(req.files)
    const { postImage, ...preferUsers } = req.body
    const result = await DatingModel.findOneAndUpdate({ uid: currentUser }, { images: medias, preferUsers }, { new: true })
    if (result) res.status(200).json({ success: true, data: result })
    else res.status(400).json({ success: false, message: 'update failed' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getDatingInfo = async (req: Request, res: Response) => {
  const currentUser = req.user._id
  const result = await DatingModel.find({ uid: currentUser }).populate({ path: 'liked', select: 'profile' }).populate({ path: 'matched', select: 'profile' })
  res.status(200).json(result)
}

export const getLikedUsers = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const result = await DatingModel.findOne({ uid: currentUser }).populate({
      path: 'liked',
      select: 'profile',
      populate: {
        path: 'dating',
      },
    })
    if (result) return res.status(200).json(result)
    res.status(400).json({ sccuess: false, message: '查询失败，请重试' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getChats = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const result = await DatingModel.aggregate()
      .match({ uid: currentUser })
      .project({ matched: 1 })
      .lookup({
        from: 'users',
        localField: 'matched',
        foreignField: '_id',
        as: 'profile',
      })
      .unwind('profile')
      .addFields({
        _id: '$profile._id',
        profile: {
          $mergeObjects: ['$profile.profile', { last_seen: '$profile.last_seen' }],
        },
      })
    res.status(200).json(result)
  } catch (error) {
    console.log('a error occured in fetchUsers controller', error.message)
    res.status(500).send('服务器故障')
  }
}
