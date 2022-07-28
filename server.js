const mongoose = require("mongoose");

require("dotenv/config");
const app = require("./app");

mongoose.connect(process.env.DB_CONNECTION, (err) => {
  if (err) return console.log(err);
  else console.log("connected to db!");
});

const port = 80;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
