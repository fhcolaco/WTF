const mongoose = require("mongoose");

const roomDetailsSchema = new mongoose.Schema(
  {
    _room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    _details_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "details_categories",
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
