const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
