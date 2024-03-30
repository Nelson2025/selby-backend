const mongoose = require("mongoose");

const connection = mongoose
  .createConnection(
    "mongodb+srv://nelson2025:Nelson@2025@cluster0.pzugxtx.mongodb.net/"
  )
  .on("open", () => {
    console.log("MongoDB Connected");
  })
  .on("error", () => {
    console.log("MongoDB Connection Error");
  });

module.exports = connection;
