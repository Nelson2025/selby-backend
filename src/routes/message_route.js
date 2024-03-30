const MsgRoutes = require("express").Router();
const MsgController = require("../controllers/message_controller");

MsgRoutes.post("/addMsg/", MsgController.addMessage);
MsgRoutes.post("/getMsg", MsgController.getMessages);
MsgRoutes.post("/createRoom/", MsgController.createRoom);
MsgRoutes.get("/getRoom/:id", MsgController.getRoom);

module.exports = MsgRoutes;
