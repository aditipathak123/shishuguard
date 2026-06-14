import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // user reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // notification type
    type: {
      type: String,

      enum: [
        "feeding_reminder",
        "sleep_reminder",
        "vaccine_reminder",
        "appointment_reminder",
        "milestone_celebration",
        "weather_alert",
        "essentials_alert",
        "general",
      ],

      required: true,
    },

    // title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // message body
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // priority level
    priority: {
      type: String,

      enum: [
        "low",
        "medium",
        "high",
        "urgent",
      ],

      default: "medium",
    },

    // notification schedule
    scheduledFor: {
      type: Date,
      required: true,
    },

    // read status
    isRead: {
      type: Boolean,
      default: false,
    },

    // sent status
    isSent: {
      type: Boolean,
      default: false,
    },

    // optional redirect URL
    actionUrl: {
      type: String,
      default: "",
    },

    // extra optional data
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // category
    category: {
      type: String,

      enum: [
        "reminder",
        "alert",
        "celebration",
        "info",
      ],

      default: "reminder",
    },
  },

  {
    timestamps: true,
  }
);

// indexes for faster queries
notificationSchema.index({
  userId: 1,
  scheduledFor: 1,
});

notificationSchema.index({
  userId: 1,
  isRead: 1,
});

notificationSchema.index({
  userId: 1,
  isSent: 1,
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;