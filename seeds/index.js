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
    const price = Math.floor(Math.random() * 50);
    const accommodation = new Accommodation({
      location: `${sample(cities).city}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nisi! Quae, eos mollitia quas quasi sapiente commodi, illo quia a quo nihil eaque dicta sint ad blanditiis culpa adipisci ullam.",
      price,
    });
    await accommodation.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
