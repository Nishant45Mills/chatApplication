const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const response = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `db connected successfully ${response.connection.host}`.underline.blue
    );
  } catch (error) {
    console.log(`${error.message}`.red);
    process.exit();
  }
};

module.exports = dbConnect;
