const CategoryModel = require("../models/category_model");

const CategoryController = {
  createCategory: async function (req, res) {
    try {
      const categoryData = req.body;
      const newCategory = new CategoryModel(categoryData);
      if (req.file) {
        newCategory.image = req.file.path;
      }
      await newCategory.save();

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

      const updatedCategory = await CategoryModel.findOneAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );

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
