const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    _hotel_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel_categories",
      required: true,
    },
    _services: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "services",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
