import { Request, Response } from "express"
import { TaskModel } from "model/Task"
import { userModel } from "model/User"
export const addTask = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const newTask = { ...req.body, createdBy: currentUser }
    const result = await TaskModel.create(newTask)
    if (result) {
      userModel.findByIdAndUpdate(
        { _id: currentUser },
        {
          $push: { tasks: result._id },
        }
      )
      return res.status(201).json({ success: true, result })
    }
    res.status(400).json({ success: false, message: "添加失败，请重试" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const getTasks = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user._id
    const result = await TaskModel.find({ createdBy: currentUser })
    if (result) return res.status(201).json(result)
    console.log(result)
    res.status(400).json({ success: false, message: "查询失败，请重试" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const tid = req.params.tid
    const result = await TaskModel.findByIdAndDelete({ _id: tid })
    if (result)
      return res.status(201).json({ success: true, message: "删除成功" })
    res.status(400).json({ success: false, message: "删除失败，请重试" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
export const updateTask = async (req: Request, res: Response) => {
  try {
    const tid = req.params.tid
    const currentUser = req.user._id
    const { tid: task, ...updatedTask } = req.body
    updatedTask.createdBy = currentUser
    const result = await TaskModel.findByIdAndUpdate(
      { _id: tid },
      updatedTask,
      { new: true }
    )
    if (result)
      return res.status(201).json({ success: true, message: "更新成功" })
    res.status(400).json({ success: false, message: "更新失败，请重试" })
  } catch (error) {
    res.status(500).json(error.message)
  }
}
