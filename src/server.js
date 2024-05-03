const express = require("express");
var http = require("http");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
require("./config/db");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

var server = http.createServer(app);
const io = new Server(server);

mongoose.connect(
  "mongodb+srv://nelson2025:9hDzNwzJgNPzdwM7@cluster0.pzugxtx.mongodb.net/selby"
);

app.route("/check").get((req, res) => {
  res.json("App is working fine");
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use("/uploads", express.static("uploads"));

//socket io
io.on("connection", (socket) => {
  console.log("CONNECTED");
  global.chatSocket = socket;

  socket.on("add-user", (roomId) => {
    console.log("USER CONNECTED");
    socket.join(roomId);

    io.to(roomId).emit("userConnected", "New User");
  });

  socket.on("send-msg", (data) => {
    console.log("msg REC ", data);

    socket.to(data.roomId).emit("msg-recieve", data);
  });

  socket.on("disconnect", (d) => {
    console.log("DISCONNECTED");
  });
});
//socket io

const UserRoutes = require("./routes/user_routes");
app.use("/api/user", UserRoutes);

const MsgRoutes = require("./routes/message_route");
app.use("/api/messages", MsgRoutes);

const CategoryRoutes = require("./routes/category_routes");
app.use("/api/category", CategoryRoutes);

const ProductRoutes = require("./routes/product_route");
app.use("/api/product", ProductRoutes);

const PORT = process.env.PORT || 7000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server Started" + PORT);
});
