const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  email: String,
  tokenNumber: String,
  status: {
    type: String,
    default: "waiting"
  }
});

module.exports = mongoose.model("Token", tokenSchema);
