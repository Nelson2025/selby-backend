const { default: mongoose } = require("mongoose");
const Messages = require("../models/message_model");
const roomModel = require("../models/room_model");
const productModel = require("../models/product_model");
const { stringify } = require("uuid");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to, roomId, productId } = req.body;
    // console.log(from);
    // console.log(to);
    // console.log(productId);
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
      productId: {
        $eq: productId,
      },
    });

    // const getRoomId = await roomModel.find({
    //   users: {
    //     $all: [from, to],
    //   },
    //   productId: {
    //     pid: new mongoose.Types.ObjectId(productId),
    //   },
    // });

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

    // console.log(msgStatus1);
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
        //image: msg.image.text,
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
    // console.log(from);
    // console.log(to);
    // console.log("RoomId" + roomId);
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      //   image: { text: image },
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

    // console.log(getRoomId[0]._id);

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
    // console.log(client);
    // console.log(my);
    // console.log(productId);
    var find1 = await roomModel
      .find({
        // $and: [{ "users._id": clientModel._id }, { "users._id": myModel._id }],
        // $and: [clientModel._id, myModel._id],
        users: {
          $eq: [client, my],
        },
        productId: {
          pid: new mongoose.Types.ObjectId(productId),
        },
        // $and: [{ client }, { my }],
      })
      .sort({ updatedAt: -1 });

    //console.log(find1.length);
    if (find1.length > 0) {
      //console.log(find1[0]._id.toString());

      console.log("already created");
      //console.log(find1);
      return res
        .status(200)
        .json({ success: true, message: "alreay created", data: find1 });
    }

    // var users = [];
    // users.push(clientModel);
    // users.push(myModel);

    const data = await roomModel.create({
      users: [client, my],
      productId: { pid: productId },
      senderId: my,
      receiverId: client,
    });
    console.log(data);
    if (data)
      return res.json({ msg: "room  create successfully.", data: data });
    else return res.json({ msg: "Failed to create room" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.getRoom = async (req, res, next) => {
  try {
    // var find1 =await roomModel.find()
    const { id } = req.params;
    console.log(id);
    // var find1 = await roomModel
    //   .aggregate([
    //     {
    //       $match: {
    //         users: {
    //           $all: [id, id],
    //         },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "products",
    //         pipeline: [
    //           // {
    //           //   $match: {
    //           //     _id: new mongoose.Types.ObjectId("$productId.pid"),
    //           //   },
    //           // },
    //           {
    //             $project: {
    //               _id: 0,
    //               productId: "$_id",
    //               title: "$title",
    //               description: "$description",
    //               image: "$image",
    //             },
    //           },
    //         ],
    //         localField: "ObjectId",
    //         foreignField: "productId.pid",
    //         as: "productDetails",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "users",
    //         pipeline: [
    //           {
    //             $match: {
    //               _id: new mongoose.Types.ObjectId(id),
    //             },
    //           },
    //           {
    //             $project: {
    //               _id: 0,
    //               phone: "$phone",
    //               name: "$name",
    //             },
    //           },
    //         ],
    //         localField: "ObjectId",
    //         foreignField: "userId",
    //         as: "userDetails",
    //       },
    //     },

    //     {
    //       $unwind: "$userDetails",
    //     },
    //     {
    //       $unwind: "$productDetails",
    //     },

    // {
    //   $unwind: {
    //     path: "$userDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },

    // {
    //   $unwind: {
    //     path: "$productDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },

    // {
    //   $lookup: {
    //     from: "properties",
    //     pipeline: [
    //       {
    //         $project: { _id: 0, title: "$title" },
    //       },
    //     ],
    //     localField: id,
    //     foreignField: id,
    //     as: "result",
    //   },
    // },
    // { sort: { updatedAt: -1 } },
    // ])
    // .sort({ updatedAt: -1 });

    //  const foundProperties = await PropertiesModel.findById(id);

    // const find2 = await Messages.find({
    //   users: {
    //     $all: [id, id],
    //   },
    // }).sort({ updatedAt: 1 });
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

    // const find2 = await productModel.find({
    //   id: {
    //     $all: [find1.productId.pid],
    //   },
    // });
    console.log(find1);
    if (find1) return res.json({ msg: "rooms", data: find1 });
    else return res.json({ msg: "Failed to create room", data: [] });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports.getUserRoom = async (req, res, next) => {
  try {
    // var find1 =await roomModel.find()
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
