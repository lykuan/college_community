import { Router } from "express"
import { auth } from "utils/middlewares"
import {
  addTask,
  updateTask,
  getTasks,
  deleteTask,
} from "../controllers/task-controller"
const taskRoutes = Router()

taskRoutes.post("/create", auth, addTask)
taskRoutes.put("/delete/:tid", auth, deleteTask)
taskRoutes.put("/update/:tid", auth, updateTask)
taskRoutes.get("/getTasks", auth, getTasks)

export default taskRoutes
