const CategoryModel = require("../models/category_model");
const express = require("express");

const CategoryController = {
  createCategory: async function (req, res) {
    try {
      const categoryData = req.body;
      const newCategory = new CategoryModel(categoryData);
      // if (req.files) {
      //   let path = "";
      //   req.files.forEach(function (files, index, arr) {
      //     path = path + files.path + ",";
      //   });
      //   path = path.substring(0, path.lastIndexOf(","));
      //   newCategory.image = path;
      // }
      if (req.file) {
        newCategory.image = req.file.path;
      }
      await newCategory.save();
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
        data: newCategory,
        message: "Category Created",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllCategories: async function (req, res) {
    try {
      const categories = await CategoryModel.find();
      return res.json({
        success: true,
        data: categories,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchCategoryById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundCategory = await CategoryModel.findById(id);

      if (!foundCategory) {
        return res.json({ success: false, message: "Category Not Found" });
      }

      return res.json({
        success: true,
        data: foundCategory,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updateCategory: async function (req, res) {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      if (req.file) {
        updatedData.image = req.file.path;
      }
      // const foundCategory = await CategoryModel.findById(id);

      // if (!foundCategory) {
      //   return res.json({ success: false, message: "Category Not Found" });
      // }

      // const newCategory = new CategoryModel(categoryData);
      // if (req.files) {
      //   let path = "";
      //   req.files.forEach(function (files, index, arr) {
      //     path = path + files.path + ",";
      //   });
      //   path = path.substring(0, path.lastIndexOf(","));
      //   newCategory.image = path;
      // }
      // if (req.file) {
      //   newCategory.image = req.file.path;
      // }
      // console.log(newCategory);
      // await newCategory
      //   .updateOne(
      //     {
      //       _id: ObjectId(id),
      //     },
      //     { $set: newCategory }
      //   )
      //   .then((response) => {
      //     res.json({ message: "employee added successfully" });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     res.json({
      //       message: error,
      //     });
      //   });
      console.log(id);
      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );
      // .then((response) => {
      //   console.log("Response" + response);
      // })
      // .catch((error) => {
      //   console.log("error" + error);
      // });

      if (!updatedCategory) {
        throw "Category Not Found";
      }

      return res.json({
        success: true,
        data: updatedCategory,
        message: "Category Updated",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = CategoryController;
