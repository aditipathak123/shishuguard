import mongoose from "mongoose";



const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  
  image: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,

      enum: [
        "pediatrician",
        "baby",
        "mother",
        "parenting expert",
        "sleep consultant",
        "lactation consultant",
        "experienced parent",
        "nutritionist",
        "nani",
      ],

      required: true,
    },

    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);



const Chat =
  mongoose.models.Chat ||
  mongoose.model("Chat", chatSchema);

export default Chat;