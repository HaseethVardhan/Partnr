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

    const conversationsWithDetails = await Promise.all(
        activeConversations.map(async (conv) => {
            // Populate latest chat
            const populatedConv = await Conversation.findById(conv._id)
                .populate({
                    path: 'chats',
                    options: { sort: { createdAt: -1 }, limit: 1 },
                    model: 'Chat'
                })
                .populate([
                    { path: 'user1', select: '_id fullname profilePicture' },
                    { path: 'user2', select: '_id fullname profilePicture' }
                ]);

            // Determine the other user
            const otherUser = populatedConv.user1._id.equals(req.user._id)
                ? populatedConv.user2
                : populatedConv.user1;

            return {
                conversationId: populatedConv._id,
                otherUser,
                latestChat: populatedConv.chats[0] || null
            };
        })
    );

    return res.status(200).json(new ApiResponse(200, conversationsWithDetails, "Active conversations fetched successfully"));
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

    // Check if userId is in req.user._id's connectionsArray
    const userWithConnections = await User.findById(req.user._id).populate('connectionsArray');
    const isConnected = userWithConnections.connectionsArray.some(conn =>
        conn.first_connect.equals(userId) || conn.second_connect.equals(userId)
    );

    return res.status(200).json(new ApiResponse(200, {
        conversation: {
            ...conversation.toObject(),
            otherUser
        },
        isConnected
    }, "Conversation loaded successfully"));
})

export {
    newMessage,
    fetchConversations,
    loadConversation
}