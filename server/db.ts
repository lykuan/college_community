import mongoose from "mongoose"
import { logger } from "./utils/logger"

export default async function connect() {
  try {
    const uri: string = process.env.DATABASE_URL!

    await mongoose.connect(uri)
    console.log("connected mongodb")
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message)
      process.exit(1)
    }
  }
}
