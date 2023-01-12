const mongo = require("mongoose");

const userSchema = new mongo.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      index: { unique: true }
    },
    sjsuid:{
      type: String,
      require: true,
      trim: true,
      index: { unique: true }
    },
    //Minimum eight characters, at least one letter and one number
    password: {
      type: String,
      required: true
    },
    userRole: {
      type: Number,
      required: true,
    },
    verified: {
      type: String,
      default: false,
    },
    secretKey: {
      type: String,
      default: null,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongo.model("users", userSchema);
