import mongoose from "mongoose";

// const conversationSchema = new mongoose.Schema({
//   user1: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   user2: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   chats: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Chat"
//     }
//   ],
//   active: {
//     type: Boolean,
//     default: false
//   }
// }, {timestamps: true});

// export const Conversation = mongoose.model("Conversation", conversationSchema);

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  active: {
    type: Boolean,
    default: false
  },
  lastMessage: {
    type: String,
    createdAt: Date
  }
}, { timestamps: true });

conversationSchema.index({ participants: 1 }); // for fast lookups

export const Conversation = mongoose.model("Conversation", conversationSchema);
