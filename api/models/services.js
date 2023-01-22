const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    _service_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service_categories",
      required: false,
    },
    _service_room: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "room_services",
      required: false,
    },
    _hotels: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "hotels",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isHotelService: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("services", servicesSchema);
