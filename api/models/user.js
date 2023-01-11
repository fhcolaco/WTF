const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      required: true,
      type: String,
      unique: true,
    },
    pass: {
      required: true,
      type: String,
    },
    is_admin: {
      required: true,
      type: Boolean,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    billing_address: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    fiscal_number: {
      required: true,
      type: Number,
    },
    credit_card: {
      required: false,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
