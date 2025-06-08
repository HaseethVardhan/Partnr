import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
  first_connect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  second_connect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending"
  }, 
});

export const Connection = mongoose.model("Connection", connectionSchema);
