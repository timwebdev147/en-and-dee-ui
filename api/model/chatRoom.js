const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      unique: true,
    },
    members: {
      type: Array
    }
  },
  { timestamps: true }
);




module.exports = mongoose.model("Conversation", ConversationSchema);