const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Accommodation = require("./models/accommodation");

mongoose.connect("mongodb://localhost:27017/review-stay");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/accommodations", async (req, res) => {
  const accommodations = await Accommodation.find({});
  res.render("accommodations/index", { accommodations });
});

app.get("/accommodations/new", (req, res) => {
  res.render("accommodations/new");
});

app.get("/accommodations/:id/edit", async (req, res) => {
  const { id } = req.params;
  const accommodation = await Accommodation.findById(id);
  res.render("accommodations/edit", { accommodation });
});

app.get("/accommodations/:id", async (req, res) => {
  const { id } = req.params;
  const accommodation = await Accommodation.findById(id);
  res.render("accommodations/show", { accommodation });
});

app.post("/accommodations", async (req, res) => {
  const { title, location, image, description, price } = req.body.accommodation;
  const accommodation = new Accommodation({
    title,
    location,
    image,
    description,
    price,
  });
  await accommodation.save();
  res.redirect(`/accommodations/${accommodation._id}`);
});

app.put("/accommodations/:id", async (req, res) => {
  const { id } = req.params;
  const { title, location, image, description, price } = req.body.accommodation;
  const accommodation = await Accommodation.findByIdAndUpdate(
    id,
    { title, location, image, description, price },
    { new: true }
  );
  res.redirect(`/accommodations/${accommodation._id}`);
});

app.delete("/accommodations/:id", async (req, res) => {
  const { id } = req.params;
  await Accommodation.findByIdAndDelete(id);
  res.redirect("/accommodations");
});

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
