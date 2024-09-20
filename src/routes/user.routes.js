import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router=Router()
// router.use(verifyJWT)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


export default router