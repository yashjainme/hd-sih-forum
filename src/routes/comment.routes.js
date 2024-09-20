import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { createNewDiscussion } from "../controllers/discussion.controller";
import { addCommentToDiscussion, getAllDiscussionComments } from "../controllers/comment.controller.js";


const router=Router()
// router.use(verifyJWT)
router.route("/add-comment").post(verifyJWT,addCommentToDiscussion)
router.route("/get-discussion-comments/:discussionId").get(getAllDiscussionComments)

export default router