const mongoose = require("mongoose");

const roomServicesSchema = new mongoose.Schema(
  {
    _room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
    _service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room_services", roomServicesSchema);
