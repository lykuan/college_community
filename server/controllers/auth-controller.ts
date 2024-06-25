import { NextFunction, Request, Response } from "express"
import { userModel } from "../model/User"
import { logger } from "../utils/logger"
import { mailService } from "../utils/sendEmail"
import { connectRedis } from "../utils/redis"
import {
  encryptPassword,
  verifyPassword,
  generateCode,
  generateTokenAndSetCookie,
} from "../utils/helper"
import { generateFromEmail } from "unique-username-generator"
import DatingUserModel from "model/Dating"
const model = new userModel().$model()
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isExisting = await model.findOne({ email: req.body.email })
    const randomUser = generateFromEmail(req.body.email, 4)
    if (isExisting) {
      logger.child({ user: req.body.email }).error("user exists")
      return res.json({
        status: 400,
        message: "The account has already existed",
      })
    }

    const hashpwd = encryptPassword(req.body.password)
    const result = await model.create({
      ...req.body,
      password: hashpwd,
      "profile.username": randomUser,
    })
    const dating = await DatingUserModel.create({ uid: result._id })
    await model.findByIdAndUpdate({ _id: result._id }, { dating: dating._id })
    if (result) {
      logger.child({ user: result.email }).info("user account is created")
      return res.status(200).send("注册成功")
    }
    res.status(400).send("注册失败")
  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
}
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password: pwd } = req.body
    const user = await (await model.findOne({ email })).populate("dating")
    const signInLogger = logger.child({ user: email })
    if (!user) {
      signInLogger.error(`account is not existing`)
      return res.json({ satus: 400, message: "the account is not existing" })
    }
    const pwdCorrected = await verifyPassword(pwd, String(user!.password))
    console.log(pwdCorrected)

    if (!pwdCorrected) {
      signInLogger.error("password is wrong")
      return res.json({
        status: 400,
        message: "input password is not correct,please again",
      })
    }

    const token = generateTokenAndSetCookie(email)
    res.cookie("jwt", token)

    const { ...baseUser } = user as any
    const { password, ...userBaseInfo } = baseUser["_doc"]
    signInLogger.info("sign in scucessfully")
    res.json({
      status: 200,
      message: "sign in successfully",
      token,
      userBaseInfo,
    })
  } catch (error) {
    console.log("error in signin-controller", error.message)
  }
}
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = generateCode()
    const { sendEmail, transporter } = mailService()
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: req.body.email,
      subject: "来自毕业设计作品",
      text: `我们已向你发送验证码，为了你的账户安全，请不要泄露. ${code}`,
    }
    const isSent = await sendEmail(transporter, mailOptions)
    console.log(isSent)
    if (isSent?.accepted.length) {
      const redis = await connectRedis()
      logger.child({ user: req.body.email }).info("重置密码请求")
      res.status(200).json({ success: true, message: "邮件发送成功" })
      redis.set("emailCode", code)
    } else {
      logger.child({ user: req.body.email }).error("重置密码请求失败")
      res.json({ success: false, message: "邮件发送失败,请再试一次" })
    }
  } catch (error) {}
}

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const submitedCode = req.body.code
    const redis = await connectRedis()
    const authCode = await redis.get("emailCode")
    if (authCode == submitedCode)
      res.json({ success: true, message: "验证成功" })
    else res.json({ success: false, message: "验证码错误" })
  } catch (error) {}
}
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body.email)
  const hashpwd = encryptPassword(req.body.password)
  const result = await model.findOneAndUpdate(
    { email: req.body.email },
    {
      password: hashpwd,
    }
  )
  console.log(result)
  if (result) res.status(200).send("密码重置成功")
  else res.status(400).send("重置失败")
}
