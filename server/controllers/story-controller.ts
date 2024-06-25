import { Request, Response } from "express"
import PostModel from "../model/Story"
import { handleFilesAccess } from "utils/helper"
import { userModel } from "model/User"
import postModel from "model/Story"
export const createStory = async (req: Request, res: Response) => {
  const { uid: author } = req.params
  let postImages
  try {
    if (req.files) {
      const files: Express.Multer.File[] = req.files as Express.Multer.File[]
      postImages = handleFilesAccess(files)
    }
    const result = await PostModel.create({
      content: req.body.text,
      media: postImages,
      author,
    })
    res.status(200).json({ message: "帖子分享成功", result })
  } catch (error) {
    res.status(500).json({ message: "服务器故障", error })
  }
}
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { sid } = req.params
    const result = await PostModel.findByIdAndDelete({ _id: sid })
    if (result) res.json({ message: "帖子删除成功", success: true })
    else res.json({ message: "帖子删除失败", success: false })
  } catch (error) {
    res.status(500).send(error)
  }
}
export const bookmarkStory = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const { sid } = req.params
    const result = await postModel.findById({ _id: sid })
    if (result.bookmark.includes(currentUser)) {
      console.log("first")
      result.bookmark = result.bookmark.filter((user) => user.toString() != currentUser)
      console.log(result)
      await result.save()
      return res.json({ success: true, data: result })
    } else {
      result.bookmark.push(currentUser)
      result.save()
      res.status(200).json({ success: true, data: result })
    }
  } catch (error) {
    res.status(500).send(error)
  }
}
export const fetchStories = async (req: Request, res: Response) => {
  try {
    const pages: number = Number(req.query.cursor!)
    const result = await PostModel.find()
      .skip(pages)
      .limit(10)
      .sort({ createdAt: -1 })
      .populate("author")
      .populate({ path: "comments.commentBy", select: "profile" })
    if (result) return res.send(result)
    res.send("没有故事，请分享你的故事")
  } catch (error) {
    res.status(500).json(error)
  }
}

export const likeStory = async (req: Request, res: Response) => {
  try {
    const { sid } = req.params
    const userId = req.user._id
    const doc = await PostModel.findById(sid)
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

export const dislikeStory = async (req: Request, res: Response) => {
  try {
    const { sid } = req.params
    const userId = req.user._id
    const doc = await PostModel.findById(sid)
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
  const { sid } = req.params
  const userId = req.user._id
  const { commentBody: commentContent } = req.body
  const commentInfo = {
    comment: commentContent,
    commentBy: userId,
  }
  try {
    const result = await PostModel.findByIdAndUpdate(
      { _id: sid },
      { $push: { comments: commentInfo } },
      { new: true }
    )
    if (result) res.status(201).json({ message: "评论成功", success: true })
    else res.status(400).json({ message: "评论失败", success: false })
  } catch (error: any) {
    res.status(500).json(error)
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  const { sid, cid } = req.params

  console.log(cid, sid)
  const result = await PostModel.findOne({ _id: sid, "comments._id": cid })
  result.comments = result.comments.filter((comment: any) => {
    return comment._id != cid
  })
  await result.save()
  if (result) res.json({ message: "评论删除成功", success: true })
  else res.json({ message: "评论删除失败,请重试", success: false })
}

export const fetchStory = async (req: Request, res: Response) => {
  try {
    const { sid } = req.params
    const result = await PostModel.findOne({ _id: sid })
      .populate("author")
      .populate({ path: "comments.commentBy", select: "profile" })
    if (result) return res.json(result)
    else res.status(400).json({ message: "出现错误，请重试" })
  } catch (error) {
    res.status(500).json(error)
  }
}
