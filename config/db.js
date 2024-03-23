const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "NOTES",
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("error to DataBase", error);
    process.exit(1);
  }
};

module.exports = connectDB;
