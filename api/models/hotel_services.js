const mongoose = require("mongoose");

const hotelServicesSchema = new mongoose.Schema({
  _hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hotels",
    required: true,
  },
  _services: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "services",
    required: true,
  },
});

module.exports = mongoose.model("hotel_services", hotelServicesSchema);
