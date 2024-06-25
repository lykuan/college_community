import { Router } from "express"
import {
  signIn,
  signUp,
  forgotPassword,
  verifyCode,
  resetPassword,
} from "../controllers/auth-controller"
const authRoute: Router = Router()

authRoute.post("/signUp", signUp)
authRoute.post("/signIn", signIn)
authRoute.post("/forgotPassword", forgotPassword)
authRoute.post("/verifyCode",verifyCode)
authRoute.post("/resetPassword", resetPassword)
export default authRoute
