import { Router } from "express"
import { auth } from "../utils/middlewares"
import {
  createStory,
  dislikeStory,
  fetchStories,
  deleteStory,
  likeStory,
  fetchStory,
  deleteComment,
  createComment,
  bookmarkStory,
} from "../controllers/story-controller"
import { storyCommentUpload, storyUpload } from "../utils/upload"
import PostModel  from "../model/Story"
import { faker } from "@faker-js/faker"
const storyRoutes = Router()

storyRoutes.post(
  "/:uid/createStory",
  auth,
  storyUpload.array("storyImages", 3),
  createStory
)
storyRoutes.post(
  "/:sid/bookmark",
  auth,
  bookmarkStory
)
storyRoutes.get("/fetchStories", fetchStories)
storyRoutes.get("/:sid", fetchStory)
storyRoutes.post("/:sid/likeStory", auth, likeStory)
storyRoutes.post("/:sid/dislikeStory", auth, dislikeStory)
storyRoutes.post(
  "/:sid/commentForStory",
  auth,
  storyCommentUpload.single("commentImage"),
  createComment
)

storyRoutes.put("/:sid/deleteComment/:cid", auth, deleteComment)
storyRoutes.put("/deleteStory/:sid", auth, deleteStory)
storyRoutes.post("/:num/populate", async (req, res) => {
  const datas = req.params.num as unknown as number
  let i = 0
  while (i++ < datas) {
    const result = await PostModel.create({
      content: faker.lorem.paragraphs(),
      author: faker.database.mongodbObjectId(),
      media: faker.helpers.arrayElements(
        [faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
        { min: 0, max: 3 }
      ),
    })
  }
  res.send("模拟数据注入成功")
})
export default storyRoutes
