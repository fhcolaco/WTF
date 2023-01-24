const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user: {
      required: false,
      type: String,
      unique: true,
    },
    pass: {
      required: false,
      type: String,
    },
    is_admin: {
      required: false,
      type: Boolean,
    },
    name: {
      required: false,
      type: String,
    },
    email: {
      required: false,
      type: String,
    },
    billing_address: {
      required: false,
      type: String,
    },
    phone: {
      required: false,
      type: Number,
    },
    fiscal_number: {
      required: false,
      type: Number,
    },
    credit_card: {
      required: false,
      type: Number,
    },
    image: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
