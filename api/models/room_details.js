const mongoose = require("mongoose");

const roomDetailsSchema = new mongoose.Schema(
  {
    _room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    details: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room_details", roomDetailsSchema);
