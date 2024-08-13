const { app, server } = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT;
const chatPort = process.env.CHATPORT;

mongoose.connect(process.env.DATABASE_URL).then((data) => {
  app.listen(port, () => {
    console.log(`connected to db`);
    console.log(`server runs on port ${port}`);
  });

  server.listen(chatPort, () => {
    console.log(`chat server runs on port ${chatPort}`);
  });
});
