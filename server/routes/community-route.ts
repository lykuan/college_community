import { Router } from "express"
import {
  createCommunity,
  fetchAllCommunities,
  fetchCommunitiesByUser,
  joinCommunity,
} from "../controllers/community-controller"
import { auth } from "utils/middlewares"
const communityRoute: Router = Router()

communityRoute.post("/create",auth, createCommunity)
communityRoute.get("/", fetchAllCommunities)
communityRoute.get("/:uid",auth, fetchCommunitiesByUser)
communityRoute.post("/:cid/join",auth, joinCommunity)
export default communityRoute
