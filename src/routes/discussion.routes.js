import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNewDiscussion, getAllDiscussions, getDiscussionById } from "../controllers/discussion.controller.js";


const router=Router()
// router.use(verifyJWT)
router.route("/create-discussion").post(verifyJWT,createNewDiscussion)
router.route("/get-discussions").get(getAllDiscussions)
router.route("/get-discussion-by-id/:discussionId").get(getDiscussionById)


export default router