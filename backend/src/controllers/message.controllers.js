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

const fetchConversations = asyncHandler (async (req, res) => {
    const user = await User.findById(req.user._id).populate({
        path: 'conversationsArray',
        match: { active: true }
    });

    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    const activeConversations = user.conversationsArray;

    for (let idx = 0; idx < activeConversations.length; idx++) {
        const conv = activeConversations[idx];
        const otherUserId = conv.user1.equals(req.user._id) ? conv.user2 : conv.user1;
        const otherUser = await User.findById(otherUserId).select('+username +fullname +profilePicture');
        
        // Get the most recent chat object from chats array
        let latestChat = null;
        if (conv.chats && conv.chats.length > 0) {
            // Assuming chats are stored as ObjectIds, get the last one
            const lastChatId = conv.chats[conv.chats.length - 1];
            latestChat = await Chat.findById(lastChatId).text;
        }

        activeConversations[idx] = {
            ...conv.toObject(),
            otherUser,
            latestChat
        };
    }

    return res.status(200).json(new ApiResponse(200, activeConversations, "Active conversations fetched successfully"));
})

const loadConversation = asyncHandler (async (req, res) => {
    const {userId} = req.body;

    if (!userId) {
        return res.status(400).json(new ApiResponse(400, null, "userId is required"));
    }

    // Find the conversation in req.user._id's conversationArray
    const user = await User.findById(req.user._id).populate({
        path: 'conversationsArray',
        match: {
            $or: [
                { user1: req.user._id, user2: userId },
                { user1: userId, user2: req.user._id }
            ]
        }
    });

    if (!user || !user.conversationsArray || user.conversationsArray.length === 0) {
        return res.status(404).json(new ApiResponse(404, null, "Conversation not found"));
    }

    // There should be only one conversation between two users
    let conversation = user.conversationsArray[0];

    // Populate the chats and the other user (not req.user._id)
    conversation = await Conversation.populate(conversation, [
        { path: 'chats', model: 'Chat' },
        { 
            path: 'user1 user2', 
            select: '_id fullname profilePicture'
        }
    ]);

    const otherUser = conversation.user1._id.equals(req.user._id) ? conversation.user2 : conversation.user1;

    return res.status(200).json(new ApiResponse(200, {
        conversation: {
            ...conversation.toObject(),
            otherUser
        }
    }, "Conversation loaded successfully"));
})

export {
    newMessage,
    fetchConversations,
    loadConversation
}