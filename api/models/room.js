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
    _services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "services",
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    rating: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);
