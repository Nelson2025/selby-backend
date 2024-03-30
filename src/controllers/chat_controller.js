const ChatModel = require("../models/chat_model");
const express = require("express");

const ChatController = {
  createChat: async function (req, res) {
    try {
      const chatData = req.body;
      print("Chats:" + chatData);
      const newChat = new ChatModel(chatData);
      // if (req.files) {
      //   let path = "";
      //   req.files.forEach(function (files, index, arr) {
      //     path = path + files.path + ",";
      //   });
      //   path = path.substring(0, path.lastIndexOf(","));
      //   newCategory.image = path;
      // }
      //   if (req.file) {
      //     newChat.image = req.file.path;
      //   }
      await newChat.save();
      // .then((response) => {
      //   res.json({ message: "employee added successfully" });
      // })
      // .catch((error) => {
      //   res.json({
      //     message: error,
      //   });
      // });

      return res.json({
        success: true,
        data: newChat,
        message: "Chat Saved",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllChat: async function (req, res) {
    try {
      const chat = await ChatModel.find();
      return res.json({
        success: true,
        data: chat,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllChatByUserId: async function (req, res) {
    try {
      const id = req.params.id;
      const chat = await ChatModel.find(id);
      return res.json({
        success: true,
        data: chat,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchChatById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundChat = await ChatModel.findById(id);

      if (!foundChat) {
        return res.json({ success: false, message: "Chat Not Found" });
      }

      return res.json({
        success: true,
        data: foundChat,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //   updateCategory: async function (req, res) {
  //     try {
  //       const id = req.params.id;
  //       const updatedData = req.body;
  //       if (req.file) {
  //         updatedData.image = req.file.path;
  //       }
  //       // const foundCategory = await CategoryModel.findById(id);

  //       // if (!foundCategory) {
  //       //   return res.json({ success: false, message: "Category Not Found" });
  //       // }

  //       // const newCategory = new CategoryModel(categoryData);
  //       // if (req.files) {
  //       //   let path = "";
  //       //   req.files.forEach(function (files, index, arr) {
  //       //     path = path + files.path + ",";
  //       //   });
  //       //   path = path.substring(0, path.lastIndexOf(","));
  //       //   newCategory.image = path;
  //       // }
  //       // if (req.file) {
  //       //   newCategory.image = req.file.path;
  //       // }
  //       // console.log(newCategory);
  //       // await newCategory
  //       //   .updateOne(
  //       //     {
  //       //       _id: ObjectId(id),
  //       //     },
  //       //     { $set: newCategory }
  //       //   )
  //       //   .then((response) => {
  //       //     res.json({ message: "employee added successfully" });
  //       //   })
  //       //   .catch((error) => {
  //       //     console.log(error);
  //       //     res.json({
  //       //       message: error,
  //       //     });
  //       //   });
  //       console.log(id);
  //       const updatedCategory = await CategoryModel.findOneAndUpdate(
  //         { _id: id },
  //         updatedData,
  //         { new: true }
  //       );
  //       // .then((response) => {
  //       //   console.log("Response" + response);
  //       // })
  //       // .catch((error) => {
  //       //   console.log("error" + error);
  //       // });

  //       if (!updatedCategory) {
  //         throw "Category Not Found";
  //       }

  //       return res.json({
  //         success: true,
  //         data: updatedCategory,
  //         message: "Category Updated",
  //       });
  //     } catch (ex) {
  //       return res.json({ success: false, message: ex });
  //     }
  //   },
};

module.exports = ChatController;
