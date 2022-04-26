const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
