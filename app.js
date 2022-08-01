const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const companiesRouter = require("./routes/companies");
const superusersRouter = require("./routes/superusers");

const app = express();

// global middlewares

app.use(cors());
app.use(helmet());
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: "too many requests, please try again in one hour!",
});
app.use("/api", limiter);
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/static/index.html`, (err) => {
    res.end();
    if (err) throw err;
  });
});

app.use("/api/v1/companies", companiesRouter);
app.use("/api/v1/superusers", superusersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
