const mongoose = require("mongoose");
const { cities, places, descriptors } = require("./seedHelpers");
const Accommodation = require("../models/accommodation");

mongoose.connect("mongodb://localhost:27017/review-stay");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Accommodation.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const accommodation = new Accommodation({
      location: `${sample(cities).city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
    });
    await accommodation.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
