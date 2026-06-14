import mongoose from "mongoose";

const babySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
    gender: String,
    dob: String,
    time: String,
    weight: String,
    deliveryType: String,
  },
  { timestamps: true }
);

export default mongoose.models.Baby || mongoose.model("Baby", babySchema);