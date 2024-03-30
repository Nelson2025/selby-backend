const mongoose = require("mongoose");

const connection = mongoose
  .createConnection(
    "mongodb+srv://nelson2025:9hDzNwzJgNPzdwM7@cluster0.pzugxtx.mongodb.net/selby"
  )
  .on("open", () => {
    console.log("MongoDB Connected");
  })
  .on("error", () => {
    console.log("MongoDB Connection Error");
  });

module.exports = connection;
