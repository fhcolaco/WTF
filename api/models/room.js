const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    _hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    _room_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room_categories",
      required: true,
    },
    _room_details: {
      type: [String],
      required: true,
    },
    _services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "services",
      required: false,
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
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);
