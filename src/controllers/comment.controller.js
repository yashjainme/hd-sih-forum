import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comments.model.js";

export const addCommentToDiscussion=asyncHandler(async(req,res)=>{
    const { discussionId, comment } = req.body;
    if(!discussionId || !comment){
        throw new apiError(404,"discussion and comment are required")
    }
    const newComment=await Comment.create({
        content:comment,
        discussion:discussionId,
        owner:req.user._id
    })
    console.log(newComment)
    if(!newComment){
        throw new apiError(500,"unable to add comment")
    }
    // const createdComment=Comment.findById(newComment._id)
    return res.status(200).send(new apiResponse(200,newComment,"comment added successfully"))
})

export const getAllDiscussionComments=asyncHandler(async(req,res)=>{
    const {discussionId}=req.params
    try {
        const comments=await Comment.find({discussion:discussionId}).populate("owner")
        return res.status(200).json(new apiResponse(200,comments,"all discussion comments retrieved"))
    
    } catch (error) {
        throw new apiError(500,"unable to retrieve comments")
    }    
})