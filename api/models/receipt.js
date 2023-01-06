const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    _reserve: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reserves",
      required: true,
    },
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("receipt", receiptSchema);
