import { Router } from "express"

import {
  updateAvatar,
  updateProfile,
  fetchUsers,
  fetchUserProfile,
  followedUser,
} from "../controllers/user-controller"
import { avatarUpload } from "../utils/upload"
import { auth } from "../utils/middlewares"
const userRoute = Router()

userRoute.post(
  "/uploadAvatar",
  auth,
  avatarUpload.single("avatar"),
  updateAvatar
)
userRoute.put("/updateProfile", auth, updateProfile)
userRoute.get("/getUsers", auth, fetchUsers)
userRoute.get("/:uid", fetchUserProfile)
userRoute.post("/followed/:uid", auth, followedUser)
export default userRoute
