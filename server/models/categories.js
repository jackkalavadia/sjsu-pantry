const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      required: true,
    },
    catDesc: {
      type: String,
      required: true,
    },
    catFileName: {
      type: String,
    },
    catStat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", catSchema);
