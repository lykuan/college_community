import { Router } from "express"
import {
  createPost,
  likePost,
  dislikePost,
  createComment,
  getPosts
} from "../controllers/post-controller"
import { auth } from "../utils/middlewares"
const postRoutes = Router()

postRoutes.get("",  getPosts)
postRoutes.post("/createPost", auth, createPost)
postRoutes.post("/:pid/like", auth, likePost)
postRoutes.post("/:pid/dislike", auth, dislikePost)
postRoutes.post("/:pid/commentForPost", auth, createComment)
export default postRoutes
