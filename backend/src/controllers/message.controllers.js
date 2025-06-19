import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { Connection } from "../models/connection.model.js";
import { Conversation } from "../models/conversation.model.js";
import { Chat } from "../models/chat.model.js";

const newMessage = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(new ApiResponse(400, null, errors.array()));
    }

    const { conversationId, receiverId, text } = req.body;
    const senderId = req.user._id;

    const connection = await Connection.findOne({
      $or: [
        { first_connect: senderId, second_connect: receiverId },
        { first_connect: receiverId, second_connect: senderId },
      ],
    });

    if (!connection) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Users are not connected"));
    }

    const message = await Chat.create({
      conversationId,
      senderId,
      receiverId,
      text,
    });

    const conversation = await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      updatedAt: new Date(),
      active: true,
    });

    conversation.lastMessage = {
      text: message.text,
      createdAt: message.createdAt,
    };

    await conversation.save();

    const response = new ApiResponse(201, message, "Message sent successfully");
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error sending message:", error);
    const response = new ApiResponse(500, null, "Failed to send message");
    return res.status(500).json(response);
  }
});

const fetchConversations = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "conversationsArray",
    // match: { active: true },
    populate: {
      path: "participants",
      select: "_id fullname profilePicture"
    },
    options: { sort: { updatedAt: -1 } }
  });

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const formattedConversations = user.conversationsArray.map((conv) => {
    const otherUser = conv.participants.find(
      (p) => !p._id.equals(req.user._id)
    );

    return {
      conversationId: conv._id,
      otherUser,
      latestChat: conv.lastMessage
        ? {
            text: conv.lastMessage,
            createdAt: conv.lastMessage.createdAt
          }
        : null
    };
  });


  return res.status(200).json(
    new ApiResponse(200, formattedConversations, "Conversations fetched")
  );
});

const loadConversation = asyncHandler(async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id; // assuming you're using auth middleware

    const conversation = await Conversation.findById(conversationId);

    if (!conversation || !conversation.participants.includes(userId)) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Access denied to this conversation"));
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const messages = await Chat.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res
      .status(200)
      .json(new ApiResponse(200, messages.reverse(), "Messages fetched"));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to fetch messages"));
  }
});

export { newMessage, fetchConversations, loadConversation };
