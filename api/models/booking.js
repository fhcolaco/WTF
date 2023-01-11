const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    _user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    _hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
      required: true,
    },
    _room: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "rooms",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    discount_percentage: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    is_paid: {
      type: Boolean,
      required: true,
    },
    is_canceled: {
      type: Boolean,
      required: true,
    },
    undiscounted_amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);
