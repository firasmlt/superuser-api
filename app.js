const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

const companiesRouter = require("./routes/companies");
const companyRouter = require('./routes/company');
const superusersRouter = require('./routes/superusers');
const superuserRouter = require('./routes/superuser');

const app = express();

app.use(bodyParser.json());
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
app.use("/company", companyRouter)
app.use('/superusers', superusersRouter)
app.use('/superuser', superuserRouter)
// listening

app.listen(80);
