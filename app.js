const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");
const companiesRouter = require("./routes/companies");
const companyRouter = require("./routes/company");
const superusersRouter = require("./routes/superusers");
const superuserRouter = require("./routes/superuser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) return console.log(err);
  else console.log("connected to db!");
});

// routes
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`, (err) => {
    res.end();
    if (err) throw err;
  });
});
app.get("/api", (req, res) => {
  res.status(404).send("invalid url");
});

app.get("/api/v1", (req, res) => {
  res.status(404).send("invalid url");
});

app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/superusers", superusersRouter);
app.use("/api/v1/superuser", superuserRouter);
// listening

app.listen(80);
