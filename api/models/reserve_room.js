const mongoose = require("mongoose");

const reserveRoomSchema = new mongoose.Schema(
  {
    _reserve: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reserves",
      required: true,
    },
    _room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reserve_room", reserveRoomSchema);
