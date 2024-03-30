const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema(
  {
    productId: {
      pid: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
    },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    msgStatus: { type: String, default: "new" },
    lastUser: {
      type: "String",
      default: "",
    },
    users: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", RoomSchema);
