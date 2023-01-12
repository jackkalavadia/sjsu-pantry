const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    slideImage: {
      type: String,
    },
    firstShow: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customizes", customSchema);
