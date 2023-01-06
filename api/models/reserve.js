const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema(
  {
    _user: {
      type: Number,
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
    discount_percent: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    isCanceled: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reserve", reserveSchema);
