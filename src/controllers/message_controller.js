const { default: mongoose } = require("mongoose");
const Messages = require("../models/message_model");
const roomModel = require("../models/room_model");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to, roomId, productId } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
      productId: {
        $eq: productId,
      },
    });

    const msgStatus = await Messages.find({
      users: {
        $all: [to, from],
      },
      productId: {
        $eq: productId,
      },
      msgStatus: {
        $eq: "new",
      },
    });

    if (msgStatus.length > 0) {
      if (from != messages[0].lastUser) {
        await Messages.updateMany(
          {
            users: {
              $all: [to, from],
            },
            productId: {
              $eq: productId,
            },
          },
          { $set: { msgStatus: "read" } }
        );
        await roomModel.findOneAndUpdate(
          {
            users: {
              $all: [to, from],
            },
            productId: {
              pid: new mongoose.Types.ObjectId(productId),
            },
          },
          { $set: { msgStatus: "read" } }
        );
      }
    }

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, image, roomId, productId } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      roomId: "",
      productId: productId,
    });

    await Messages.findOneAndUpdate(
      {
        users: {
          $all: [from, to],
        },
        productId: {
          $eq: productId,
        },
      },
      { $set: { lastUser: from } }
    );

    const getRoomId = await roomModel.find({
      users: {
        $all: [from, to],
      },
      productId: {
        pid: new mongoose.Types.ObjectId(productId),
      },
    });

    await roomModel.findOneAndUpdate(
      { _id: getRoomId[0]._id },
      { $set: { msgStatus: "new", lastUser: from, updatedAt: new Date() } }
    );

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.createRoom = async (req, res, next) => {
  try {
    const { clientModel, myModel, productId } = req.body;
    client = clientModel._id;
    my = myModel._id;
    var find1 = await roomModel
      .find({
        users: {
          $eq: [client, my],
        },
        productId: {
          pid: new mongoose.Types.ObjectId(productId),
        },
      })
      .sort({ updatedAt: -1 });

    if (find1.length > 0) {
      console.log("already created");
      return res
        .status(200)
        .json({ success: true, message: "alreay created", data: find1 });
    }

    const data = await roomModel.create({
      users: [client, my],
      productId: { pid: productId },
      senderId: my,
      receiverId: client,
    });

    if (data)
      return res.json({ msg: "room  create successfully.", data: data });
    else return res.json({ msg: "Failed to create room" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const find1 = await roomModel
      .find({
        users: {
          $all: [id, id],
        },
      })
      .populate("productId.pid")
      .populate("senderId")
      .populate("receiverId")
      .sort({ updatedAt: -1 });

    if (find1) return res.json({ msg: "rooms", data: find1 });
    else return res.json({ msg: "Failed to create room", data: [] });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.getUserRoom = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    var find1 = await roomModel.find({
      $and: [
        { "users.email": "mohsin@gmail.com" },
        { "users.email": "ali@gmail.com" },
      ],
    });

    if (find1) return res.json({ msg: "rooms", data: find1 });
    else return res.json({ msg: "Failed to create room", data: [] });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
