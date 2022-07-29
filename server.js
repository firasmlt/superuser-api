const mongoose = require("mongoose");

require("dotenv/config");
const app = require("./app");

mongoose
  .connect(process.env.DB_CONNECTION, {
    autoIndex: true,
  })
  .then(() => console.log("Database Connected."))
  .catch((err) => console.log("err", err));

const port = 80;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
