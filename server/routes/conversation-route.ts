import { Router } from "express"
import { auth } from "../utils/middlewares"
import {
  fetchMessages,
  sendMessage,
} from "../controllers/conversation-controller"

const conversationRoute = Router()

conversationRoute.post("/send/:uid", auth, sendMessage)
conversationRoute.get("/:uid", auth, fetchMessages)
export default conversationRoute
