import nodemailer from "nodemailer"
import { logger } from "./logger"
export const mailService = () => {
  const transporter = nodemailer.createTransport({
    service: "qq",
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const sendEmail = async (transporter: any, options: any) => {
    try {
      const info = await transporter.sendMail(options)
      return info
    } catch (error) {
      console.log(error)
      logger.child({ user: options.to }).error(error)
    }
  }
  return { transporter, sendEmail }
}
