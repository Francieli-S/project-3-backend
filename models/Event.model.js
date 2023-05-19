const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
      default: "20/05/2023",
    },

    location: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: false,
      default: "Soul",
    },

    details: {
      type: String,
      required: false,
      default: "Super cool show",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
