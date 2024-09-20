import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const registerUser=asyncHandler(async (req, res) => {
    const {username,email,password,state,occupation}=req.body
    if(!username  || !email || !password || !state || !occupation){
        throw new apiError(404, "all fields are required")
    }
    
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            console.log(existingUser)
            throw new apiError(404, "user with same email already exists")
        }
        else{
            const user=await User.create({username,email,password,state,occupation})
            const createdUser=await User.findById(user._id).select(
                "-password -refreshToken")
            if(!createdUser){
                throw new apiError(500 , "unable to register user")
            }
            return res.status(200).json(new apiResponse(200 ,createdUser,"user registered successfully"))
        }
    
})

export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        throw new apiError(404, "all fields are required")
    }
    const user=await User.findOne({email:email})
    if(!user){
        throw new apiError(404, "user not found")
        }
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new apiError(404, "invalid password")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200)
    .cookie("accessToken",accessToken, options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new apiResponse(    
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User loggin succesfully"
        )
    )

        
})
export const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()
        

        const refreshToken=user.generateRefreshToken()
        
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new apiError(500,"something went wrong while generating token")
        
    }
}
