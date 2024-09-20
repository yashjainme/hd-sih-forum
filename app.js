import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:'true',limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./src/routes/user.routes.js"
import discussionRouter from "./src/routes/discussion.routes.js"
import commentRouter from "./src/routes/comment.routes.js"

app.use("/api/users", userRouter)
app.use("/api/discussions", discussionRouter)
app.use("/api/comments", commentRouter)

export {app}