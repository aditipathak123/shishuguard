import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  babyName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["nap", "night"],
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
  },
  notes: {
    type: String,
  },
  date: {
    type: Date, 
    required: true,
  },
}, {
  timestamps: true
});

const Sleep = mongoose.models.Sleep || mongoose.model("Sleep", sleepSchema);

export default Sleep;
