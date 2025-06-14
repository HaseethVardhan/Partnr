import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    required: true
  },
  connection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Connection',
    optional: true
  },
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
    optional: true
  }
}, {
  timestamps: true
});

export const Notification = mongoose.model("Notification", notificationSchema);
