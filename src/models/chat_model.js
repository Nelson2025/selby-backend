const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  senderId: { type: String, required: [true, "Sender Id is Required"] },
  receiverId: { type: String, default: "" },
  message: { type: String, default: "" },
  productId: { type: String, default: "" },
  updatedOn: { type: Date },
  createdOn: { type: Date },
});

chatSchema.pre("save", function (next) {
  this.updatedOn = new Date();
  this.createdOn = new Date();

  next();
});

chatSchema.pre(["update", "findOneAndUpdate", "updateOne"], function (next) {
  const update = this.getUpdate();
  delete update._id;

  this.updatedOn = new Date();

  next();
});

const ChatModel = model("Chat", chatSchema);

module.exports = ChatModel;
