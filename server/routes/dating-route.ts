import { Router } from "express"
import { auth } from "utils/middlewares"
import {
  getRecommendUsers,
  likeUser,
  dislikeUser,
  updateDatingSetting,
  getDatingInfo,
  getLikedUsers,
  getChats
} from "../controllers/dating-controller"
import { datingUpload } from "utils/upload"

const datingRoutes = Router()

datingRoutes.get("/recommendUsers", auth, getRecommendUsers)
datingRoutes.get("", auth, getDatingInfo)
datingRoutes.get("/chats", auth, getChats)
datingRoutes.get("/getLikedUsers", auth, getLikedUsers)
datingRoutes.post("/likedUser/:uid", auth, likeUser)
datingRoutes.post("/dislikedUser/:uid", auth, dislikeUser)
datingRoutes.post(
  "/updateSetting",
  auth,
  datingUpload.array("datingImages"),
  updateDatingSetting
)
export default datingRoutes
