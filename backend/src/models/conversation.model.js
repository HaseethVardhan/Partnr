import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  chats: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    }
  ],
  active: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

export const Conversation = mongoose.model("Conversation", conversationSchema);