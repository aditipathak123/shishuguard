import mongoose from "mongoose";

const FeedingSchema =
  new mongoose.Schema(

    {

      userId: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      time: {

        type: String,

        required: true,
      },

      type: {

        type: String,

        enum: [

          "Breastfeeding",

          "Bottle",

          "Solid Food",
        ],

        required: true,
      },

      amount: {

        type: Number,

        required: true,
      },

      notes: {

        type: String,

        default: "",
      },
    },

    {
      timestamps: true,
    }
  );



const Feeding =

  mongoose.models.Feeding ||

  mongoose.model(
    "Feeding",
    FeedingSchema
  );

export default Feeding;