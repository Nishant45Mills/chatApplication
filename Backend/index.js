const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL).then((data) => {
  app.listen(port, () => {
    console.log(`connected to db`);
    console.log(`server runs on port ${port}`);
  });
});