const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    _hotel_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel_categories",
      required: false,
    },
    _services: {
      type: [String],
      required: false,
    },

    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
