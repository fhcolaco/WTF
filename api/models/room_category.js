const mongoose = require("mongoose");

const roomCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room_categories", roomCategorySchema);
