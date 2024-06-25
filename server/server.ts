import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./db"
import cookieParser from "cookie-parser"
import {
  authRoute,
  postRoute,
  userRoute,
  storyRoute,
  taskRoute,
  conversationRoute,
  datingRoute,
  communityRoute,
} from "./routes/index-route"
import { globalErrorHandler } from "./utils/appError"
import { logger } from "./utils/logger"
import { app, server } from "socket/socket"

dotenv.config()
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
)
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.use("/auth", authRoute)
app.use("/post", postRoute)
app.use("/user", userRoute)
app.use("/story", storyRoute)
app.use("/task", taskRoute)
app.use("/conversation", conversationRoute)
app.use("/dating", datingRoute)
app.use("/community", communityRoute)

app.use(globalErrorHandler)

const port = process.env.PORT || 8800

server.listen(port, () => {
  connectDb()
  console.log("server is running ...")
})

process.on("uncaughtException", (err) => {
  logger.error(err)
  process.exit(1)
})

process.on("unhandledRejection", (err) => {
  logger.error(err)
  process.exit(1)
})
