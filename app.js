const express = require("express");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
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

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`, (err) => {
    res.end();
    if (err) throw err;
  });
});

app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/superusers", superusersRouter);
app.use("/api/v1/superuser", superuserRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
app.listen(80);
