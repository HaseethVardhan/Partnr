import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Connection } from "../models/connection.model.js";
import { Conversation } from "../models/conversation.model.js";
import { Chat } from "../models/chat.model.js";

const newMessage = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, null, errors.array()));
    }

    const {userId, text} = req.body;
    if (!userId) {
        return res.status(400).json(new ApiResponse(400, null, "userId is required"));
    }

    // Check if a conversation exists between the two users using conversationsArray of req.user
    const user = await User.findById(req.user._id).populate('conversationsArray');
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }
    const existConversation = user.conversationsArray.find(conv =>
        (conv.user1.equals(req.user._id) && conv.user2.equals(userId)) ||
        (conv.user1.equals(userId) && conv.user2.equals(req.user._id))
    );

    if (!existConversation) {
        return res.status(404).json(new ApiResponse(404, null, "Users are not connected"));
    }

    const existingConversation = await Conversation.findById(existConversation._id);

    const chat = await Chat.create({
        senderId: req.user._id,
        receiverId: userId,
        text
    });

    if (!existingConversation.active) {
        existingConversation.active = true;
    }

    existingConversation.chats.push(chat._id);
    await existingConversation.save();

    return res.status(201).json(new ApiResponse(201, chat, "Message sent successfully"));

})

export {
    newMessage
}