const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema(
  {
    _service_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "service_categories",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("services", servicesSchema);
