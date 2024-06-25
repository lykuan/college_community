import { NextFunction, Request, Response } from 'express'
import postModel from '../model/Post'
const model = new postModel().$model()

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.user._id
    const postBody = req.body
    const result = await model.create({ ...postBody, author: currentUser })
    if (result) {
      return res.status(200).json({ success: true, message: "发布成功", data: result })
    } else {
      return res.status(400).json({ success: false, message: "发布失败，请重试" })
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await model.find()
      .populate("author")
      .populate({ path: "comments.commentedBy", select: "profile" })
    if (result) {
      return res.status(200).json(result)
    } else {
      return res.status(400).json({ message: "查询失败，请重试" })
    }
  } catch (error: any) {
    res.status(500).send(error.message)
  }
}
export const likePost = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const pid = req.params.pid
    const userId = req.user._id
    const doc = await model.findById(pid)
    if (doc?.upvotedBy.includes(userId)) {
      doc.upvotedBy = doc.upvotedBy.filter((item) => {
        return item.toString() !== userId.toString()
      })
      await doc.save()
      return res.status(200).json(doc)
    }
    if (!doc?.upvotedBy.includes(userId) && doc?.downvotedBy.includes(userId)) {
      doc.upvotedBy.push(userId)
      doc.downvotedBy = doc.downvotedBy.filter(
        (item) => item.toString() != userId.toString()
      )
      await doc.save()
      return res.status(200).json(doc)
    }
    doc.upvotedBy.push(userId)
    await doc.save()
    res.status(200).json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const dislikePost = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const { pid } = req.params
    const userId = req.user._id
    const doc = await model.findById(pid)
    if (doc?.downvotedBy.includes(userId)) {
      doc.downvotedBy = doc.downvotedBy.filter((item) => {
        return item.toString() != userId.toString()
      })
      await doc.save()
      return res.status(200).json(doc)
    }
    if (!doc?.downvotedBy.includes(userId) && doc?.upvotedBy.includes(userId)) {
      doc.downvotedBy.push(userId)
      doc.upvotedBy = doc.upvotedBy.filter(
        (item) => item.toString() != userId.toString()
      )
      await doc.save()
      return res.status(200).json(doc)
    }
    doc.downvotedBy.push(userId)
    await doc.save()
    res.status(200).json(doc)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createComment = async (req: Request, res: Response) => {
  const { pid } = req.params
  const userId = req.user._id
  const { comment } = req.body
  const commentInfo = {
    comment: comment,
    commentedBy: userId,
  }
  try {
    const result = await model.findByIdAndUpdate(
      { _id: pid },
      { $push: { comments: commentInfo } },
      { new: true }
    )
    if (result) res.status(201).json({ message: "评论成功", success: true })
    else res.status(400).json({ message: "评论失败", success: false })
  } catch (error: any) {
    res.status(500).json(error)
  }
}
