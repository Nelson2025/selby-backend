const express = require("express");
var http = require("http");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

var server = http.createServer(app);
const io = new Server(server);

// mongoose.connect("mongodb://localhost:27017/selby");
mongoose.connect(
  "mongodb+srv://nelson2025:9hDzNwzJgNPzdwM7@cluster0.pzugxtx.mongodb.net/selby"
);

// const ChatModel = require("./models/chat_model");

app.route("/check").get((req, res) => {
  res.json("App is working fine");
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.use("./src//uploads", express.static("uploads"));

io.on("connection", (socket) => {
  console.log("CONNECTED");
  global.chatSocket = socket;

  socket.on("add-user", (roomId) => {
    // onlineUsers.set(userId, socket.id);
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

// const ChatRoutes = require("./routes/chat_routes");
// app.use("/api/chat", ChatRoutes);

// var clients = {};
// var io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected");
//   console.log(socket.id, "has joined");
//   socket.on("signin", (id) => {
//     console.log(id);
//     clients[id] = socket;
//     console.log(clients);
//   });

//   socket.on("message", (msg) => {
//     console.log(msg);
//     let receiverId = msg.receiverId;
//     let senderId = msg.senderId;
//     let message = msg.message;
//     // let data = JSON({
//     //   senderId: msg.senderId,
//     //   receiverId: "1",
//     //   message: msg.message,
//     // });
//     //sendChat.createChat(data);

//     // app.route("/api/chat").post((req, res) => {
//     //   console.log("sending");
//     //   res.send({
//     //     senderId: senderId,
//     //     message: message,
//     //   });
//     // });

//     // app.post("/api/chat", function (req, res) {
//     //   console.log("sending");
//     //   res.send({
//     //     senderId: senderId,
//     //     message: message,
//     //   });
//     // });

//     const chat = new ChatModel({
//       senderId: msg.senderId,
//       receiverId: msg.receiverId,
//       message: msg.message,
//     });
//     try {
//       chat.save();
//     } catch (ex) {
//       // return res.json({ success: false, message: ex });
//       console.log(ex);
//     }

//     if (clients[receiverId]) {
//       //ChatController.createChat(data);
//       clients[receiverId].emit("message", msg);
//     }
//   });
// });

const UserRoutes = require("./src/routes/user_routes");
app.use("/api/user", UserRoutes);

const MsgRoutes = require("./src/routes/message_route");
app.use("/api/messages", MsgRoutes);

const CategoryRoutes = require("./src/routes/category_routes");
app.use("/api/category", CategoryRoutes);

const AutosRoutes = require("./src/routes/autos_route");
app.use("/api/autos", AutosRoutes);

const ProductRoutes = require("./src/routes/product_route");
app.use("/api/product", ProductRoutes);

const PropertiesRoutes = require("./src/routes/properties_route");
app.use("/api/properties", PropertiesRoutes);

const PORT = process.env.PORT || 7000;
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server Started");
});
// app.listen(PORT, "0.0.0.0", () =>
//   console.log(`Server started at PORT: ${PORT}`)
// );
