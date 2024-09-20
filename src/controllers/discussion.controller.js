import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Discussion } from "../models/discussion.model.js";
import { apiResponse } from "../utils/apiResponse.js";




export const createNewDiscussion=asyncHandler(async(req,res)=>{
    const {title,content}=req.body
    
    if(!title || !content){
        throw new apiError(404, "title and content are required");
    }
    const newDiscussion=await Discussion.create({title,content,owner:req.user._id})
    if(!newDiscussion){
        throw new apiError(404, "error creating discussion")
    }
    return res.status(201).json(new apiResponse(201,newDiscussion,"Discussion created") )

})

export const getAllDiscussions=asyncHandler(async(req,res)=>{
    try {
        const discussions=await Discussion.find().populate("owner");
        return res.status(200).json(new apiResponse(200,discussions,"Discussions retrieved"))
    } catch (error) {
        throw new apiError(500,"unable to fetch discussions")
    }
})


export const getDiscussionById=asyncHandler(async(req,res)=>{
    try {
        const {discussionId}=req.params
        const discussion=await Discussion.findById(discussionId).populate("owner")
        return res.status(200).json(new apiResponse(200,discussion,"discussion fetched successfully"))
    } catch (error) {
        console.log(error)
        throw new apiError(500,"unable to fetch discussions")
    }
})