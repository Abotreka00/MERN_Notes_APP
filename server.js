const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000; // Default to port 5000 if PORT is not provided in environment
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Use urlencoded middleware for handling form submissions

app.use("/api/notes", require("./routes/notes"));
app.use("/api/users", require("./routes/Users"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Your Server Is Live On Port ${PORT}`);
});
