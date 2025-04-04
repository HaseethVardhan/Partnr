import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
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
            .status(400)
            .json(
                new ApiResponse(
                    400,
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
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {exists: true, msg: "Email already exists"},
                    "Email already exists. Please login or use another email."
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

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {errors: errors.array()},
                    "Please ensure all fields are filled correctly.",
                )
            )
    }

    const { email, password, username, authtype, firstname, lastname } = req.body;
    
    const user = await User.findOne({ email });
    
    if (user) {
        return res
            .status(400)
            .json(
                new ApiResponse(
                    400,
                    {exists: true, msg: "Email already exists"},
                    "Email already exists. Please login or use another email."
                ) 
            )  
    }

    if(authtype === "local") {
        const newUser = await User.create({
            email,
            password,
            username,
            fullname: {
                firstname,
                lastname
            },
            authtype,
        })

        if(!newUser) {
            return res
                .status(400)
                .json(
                    new ApiResponse(
                        400,
                        {msg: "User not created"},
                        "There was a problem on our side. Please try again later."
                    ) 
                )  
        }


        const { _id } = newUser.toObject();

        const token = await newUser.generateAuthToken()

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {user: {_id}, token, msg: "User created successfully"},
                    "User created successfully"
                ) 
            )  
    }

})

export { isUserNameAvailable, isMailExists, getProfile, registerUser };