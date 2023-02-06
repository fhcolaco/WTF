const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      unique: true,
    },
    location: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    postal_code: {
      type: String,
      required: false,
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
      default: "default.svg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.pass);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.pass = await bcrypt.hash(this.pass, salt);
});

module.exports = mongoose.model("users", userSchema);
