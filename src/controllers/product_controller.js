const ProductModel = require("../models/product_model");

const ProductController = {
  createProduct: async function (req, res) {
    try {
      const productData = req.body;
      const newProduct = new ProductModel(productData);
      if (req.files) {
        let images = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          images.push(files.path);
        });
        newProduct.image = images;
      }
      await newProduct.save();
      return res.json({
        success: true,
        data: newProduct,
        message: "Product Created",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  searchAllProduct: async function (req, res) {
    try {
      const limit = req.params.limit;
      const searchText = req.params.searchText;
      const query = {
        $text: { $search: `${searchText}` },
      };
      const skip = req.params.skip;
      const products = await ProductModel.find({ $or: [query] })
        .populate("categoryId")
        .sort({ createdOn: -1 })
        .limit(limit)
        .skip(skip);

      const totalRecords = await ProductModel.find(query).count();
      return res.json({
        success: true,
        data: products,
        totalRecords: totalRecords,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllProduct: async function (req, res) {
    try {
      const limit = req.params.limit;
      const skip = req.params.skip;
      const autos = await ProductModel.find({ city: `${req.params.city}` })
        .populate("categoryId")
        .sort({ createdOn: -1 })
        .limit(limit)
        .skip(skip);

      const totalRecords = await ProductModel.find().count();
      return res.json({
        success: true,
        data: autos,
        totalRecords: totalRecords,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchProductById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundProduct = await ProductModel.findById(id).populate(
        "categoryId"
      );

      if (!foundProduct) {
        return res.json({ success: false, message: "Product Not Found" });
      }

      return res.json({
        success: true,
        data: [foundProduct],
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchProductByCategoryId: async function (req, res) {
    try {
      const id = req.params.id;
      if (req.params.subCatId != undefined) {
        subCatId = req.params.subCatId;
      } else {
        subCatId = "";
      }
      const foundProduct = await ProductModel.find({
        categoryId: id,
        subcategoryId: subCatId,
      })
        .populate("categoryId")
        .sort({ createdOn: -1 });

      if (!foundProduct) {
        return res.json({ success: false, message: "Product Not Found" });
      }

      return res.json({
        success: true,
        data: foundProduct,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllProductByUserId: async function (req, res) {
    try {
      const id = req.params.id;
      const foundProduct = await ProductModel.find({
        userId: id,
      })
        .populate("categoryId")
        .sort({ createdOn: -1 });

      if (!foundProduct) {
        return res.json({ success: false, message: "Product Not Found" });
      }
      return res.json({
        success: true,
        data: foundProduct,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = ProductController;
