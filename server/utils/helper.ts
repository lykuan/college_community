import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { CronJob } from "cron"
export const encryptPassword = (rawPassword: string) => {
  const salt = bcrypt.genSaltSync(10)
  const hashpwd = bcrypt.hashSync(rawPassword, salt)
  console.log(hashpwd)
  return hashpwd
}

export const verifyPassword = async (
  rawPassword: string,
  hashPassword: string
) => {
  return await bcrypt.compare(rawPassword, hashPassword)
}
export const generateCode = () => {
  const code = String(Math.random()).split(".")[1]
  const verifyCode = code!.slice(0, 6)
  return verifyCode
}

export const generateTokenAndSetCookie = (email) => {
  const token = jwt.sign({ email }, process.env.JWT_KEY, {
    expiresIn: "15d",
  })
  return token
}

export const runEveryDay = (job) => {
  return CronJob.from({
    cronTime: "* * * * * *",
    onTick: async () => await job(),
    start: true,
  })
}

export const handleFilesAccess = (files) => {
  return files.map((file) => {
    return (
      process.env.STATIC_URL +
      file.path.replace("public", "").replaceAll("\\", "/")
    )
  })
}
