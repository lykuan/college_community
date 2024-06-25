import { Request, Response } from "express"
import { ConversationModel } from "../model/Conversation"
import { MessageModel } from "../model/Message"
import { getReceiverSocketId, io } from "socket/socket"

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const receiver = req.params.uid
    const sender = req.user._id
    const body = req.body.text
    let existConversation = await ConversationModel.findOne({
      members: { $all: [sender, receiver] },
    })
    if (!existConversation) {
      existConversation = await ConversationModel.create({
        members: [sender, receiver],
      })
    }
    const newMessage = new MessageModel({
      sender,
      receiver,
      body,
    })
    if (newMessage) existConversation.messages.push(newMessage._id)
    const result = await Promise.all([
      existConversation.save(),
      newMessage.save(),
    ])
    if (result.length == 2) {
      const receiverSocketID = getReceiverSocketId(receiver)
      io.to(receiverSocketID).emit("newMessage", newMessage)
      return res.status(201).json({ message: "消息发送成功", newMessage })
    } else res.status(400).json({ message: "发送失败，请重试" })
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message)
    res.status(500).json(error)
    res.status(500).json({ error: "服务器故障" })
  }
}

export const fetchMessages = async (req: Request, res: Response) => {
  try {
    const { uid: userToChatId } = req.params
    const senderId = req.user._id

    const conversation = await ConversationModel.findOne({
      members: { $all: [senderId, userToChatId] },
    }).populate("messages")

    if (!conversation) return res.status(200).json([])

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in fetchMessages controller: ", error.message)
    res.status(500).json({ error: "服务器故障" })
  }
}
