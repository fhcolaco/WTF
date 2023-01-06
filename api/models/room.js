const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    room_type: {
      type: Number,
      required: true,
    },
    hotel_id: {
      type: Number,
      required: true,
    },
    atual_price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: false,
    },
    isDiscount: {
      type: Boolean,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);
