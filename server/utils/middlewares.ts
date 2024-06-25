import { NextFunction, Request, Response } from "express"
import { JwtPayload, verify } from "jsonwebtoken"
import { userModel } from "../model/User"
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt 
  if (!token) return res.status(401).send("请登录账号!")

  try {
    const decoded = verify(token, process.env.JWT_KEY!) as JwtPayload
    const user = await userModel.findOne({ email: decoded.email})
    if (user) {
      req.user = user
      next()
    }
  } catch (error) {
    res.status(403).send("无效的token")
  }
}
