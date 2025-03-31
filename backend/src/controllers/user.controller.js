import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";

const isUserNameAvailable = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {errors: errors.array()},
                    "Only letters a-z, numbers 1-9 and underscores are allowed.",
                )
            )
    }

    const { username } = req.body;
    const user = await User.findOne({ username });
    
    if (user) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {available: false, msg: "Username already exists"},
                    "Username already exists"
                ) 
            )  
    } else {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {available: true, msg: "Username is available"},
                "Username is available"
            ) 
        )  
    }
})

const isMailExists = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {errors: errors.array()},
                    "Enter valid email address.",
                )
            )
    }

    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {exists: true, msg: "Email already exists"},
                    "Email already exists"
                ) 
            )  
    } else {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {exists: false, msg: "Email is available"},
                "Email is available"
            ) 
        )  
    }

})

const getProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, {user: req.user, message: "User profile fetched successfully"}, "User profile fetched successfully"))
})

export { isUserNameAvailable, isMailExists, getProfile };