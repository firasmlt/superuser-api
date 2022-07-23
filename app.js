const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const companiesRouter = require("./routes/companies");

const app = express();
mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) return console.log(err);
  else console.log("connected to db!");
});


// routes
app.get("/", (req, res) => {
  console.log(req);
  res.status(404).send("invalid url");
});
app.use("/companies", companiesRouter);

// listening

app.listen(80);
