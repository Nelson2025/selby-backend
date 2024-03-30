const userRoutes = require("express").Router();
const ChatController = require("../controllers/chat_controller");

userRoutes.post("/createChat", ChatController.createChat);
userRoutes.post("/fetchAllChat", ChatController.fetchAllChat);

module.exports = userRoutes;
