const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    _reserve_room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reserve_rooms",
      required: true,
    },
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
    _services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "services",
      required: false,
    },
    room_services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room_services",
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
