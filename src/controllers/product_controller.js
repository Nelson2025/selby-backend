const ProductModel = require("../models/product_model");
const express = require("express");

const ProductController = {
  //   createAutos: async function (req, res) {
  //     try {
  //       const productData = req.body;
  //       const newAutos = new ProductModel({
  //         categoryId: productData.categoryId,
  //         userId: productData.userId,
  //         features: {
  //           brand: productData.brand,
  //           model: productData.model,
  //           variant: productData.variant,
  //           year: productData.year,
  //           fuel: productData.fuel,
  //           transmission: productData.transmission,
  //           kms: productData.kms,
  //           owner: productData.owner,
  //         },
  //         title: productData.title,
  //         description: productData.description,
  //         price: productData.price,
  //         favourite: productData.favourite,
  //         city: productData.city,
  //         state: productData.state,
  //         status: productData.status,
  //       });
  //       if (req.files) {
  //         let images = [];
  //         let path = "";
  //         req.files.forEach(function (files, index, arr) {
  //           //  path = path + files.path + ",";
  //           images.push(files.path);
  //         });
  //         // path = path.substring(0, path.lastIndexOf(","));
  //         newAutos.image = images;
  //       }
  //       //   if (req.file) {
  //       //     newAutos.image = req.file.path;
  //       //   }
  //       await newAutos.save();
  //       // .then((response) => {
  //       //   res.json({ message: "employee added successfully" });
  //       // })
  //       // .catch((error) => {
  //       //   res.json({
  //       //     message: error,
  //       //   });
  //       // });

  //       return res.json({
  //         success: true,
  //         data: newAutos,
  //         message: "Autos Created",
  //       });
  //     } catch (ex) {
  //       return res.json({ success: false, message: ex });
  //     }
  //   },

  createProduct: async function (req, res) {
    try {
      const productData = req.body;
      console.log(productData);
      const newProduct = new ProductModel(
        productData
        // {
        // categoryId: propertiesData.categoryId,
        // subcategoryId: propertiesData.subcategoryId,
        // userId: propertiesData.userId,
        // features: {
        //   type: propertiesData.type,
        //   bedrooms: propertiesData.bedrooms,
        //   bathrooms: propertiesData.bathrooms,
        //   furnishing: propertiesData.furnishing,
        //   constructionStatus: propertiesData.constructionStatus,
        //   listedBy: propertiesData.listedBy,
        //   superBuiltupArea: propertiesData.superBuiltupArea,
        //   carpetArea: propertiesData.carpetArea,
        //   maintenanceMonthly: propertiesData.maintenanceMonthly,
        //   totalFloors: propertiesData.totalFloors,
        //   floorNo: propertiesData.floorNo,
        //   carParking: propertiesData.carParking,
        //   facing: propertiesData.facing,
        //   projectName: propertiesData.projectName,
        // },
        // title: propertiesData.title,
        // description: propertiesData.description,
        // price: propertiesData.price,
        // favourite: propertiesData.favourite,
        // city: propertiesData.city,
        // state: propertiesData.state,
        // status: propertiesData.status,
        //   }
      );
      if (req.files) {
        let images = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          //  path = path + files.path + ",";
          images.push(files.path);
        });
        // path = path.substring(0, path.lastIndexOf(","));
        newProduct.image = images;
      }
      //   if (req.file) {
      //     newAutos.image = req.file.path;
      //   }
      await newProduct.save();
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
        data: newProduct,
        message: "Product Created",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  //   createPropertiesForRentHousesApartments: async function (req, res) {
  //     try {
  //       const propertiesData = req.body;
  //       console.log(propertiesData);
  //       const newProperties = new ProductModel({
  //         categoryId: propertiesData.categoryId,
  //         subcategoryId: propertiesData.subcategoryId,
  //         userId: propertiesData.userId,
  //         features: {
  //           type: propertiesData.type,
  //           bedrooms: propertiesData.bedrooms,
  //           bathrooms: propertiesData.bathrooms,
  //           furnishing: propertiesData.furnishing,
  //           //   constructionStatus: propertiesData.constructionStatus,
  //           listedBy: propertiesData.listedBy,
  //           bachelors: propertiesData.bachelors,
  //           superBuiltupArea: propertiesData.superBuiltupArea,
  //           carpetArea: propertiesData.carpetArea,
  //           maintenanceMonthly: propertiesData.maintenanceMonthly,
  //           totalFloors: propertiesData.totalFloors,
  //           floorNo: propertiesData.floorNo,
  //           carParking: propertiesData.carParking,
  //           facing: propertiesData.facing,
  //           projectName: propertiesData.projectName,
  //         },
  //         title: propertiesData.title,
  //         description: propertiesData.description,
  //         price: propertiesData.price,
  //         favourite: propertiesData.favourite,
  //         city: propertiesData.city,
  //         state: propertiesData.state,
  //         status: propertiesData.status,
  //       });
  //       if (req.files) {
  //         let images = [];
  //         let path = "";
  //         req.files.forEach(function (files, index, arr) {
  //           //  path = path + files.path + ",";
  //           images.push(files.path);
  //         });
  //         // path = path.substring(0, path.lastIndexOf(","));
  //         newProperties.image = images;
  //       }
  //       //   if (req.file) {
  //       //     newAutos.image = req.file.path;
  //       //   }
  //       await newProperties.save();
  //       // .then((response) => {
  //       //   res.json({ message: "employee added successfully" });
  //       // })
  //       // .catch((error) => {
  //       //   res.json({
  //       //     message: error,
  //       //   });
  //       // });

  //       return res.json({
  //         success: true,
  //         data: newProperties,
  //         message: "Properties Created",
  //       });
  //     } catch (ex) {
  //       return res.json({ success: false, message: ex });
  //     }
  //   },

  fetchAllProduct: async function (req, res) {
    try {
      const autos = await ProductModel.find()
        .populate("categoryId")
        .sort({ createdOn: -1 });
      console.log(autos);
      // const autos = await ProductModel.aggregate([
      //   {
      //     $unionWith: "properties",
      //   },
      // ]).sort({ createdOn: -1 });
      return res.json({
        success: true,
        data: autos,
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
      console.log(foundProduct);
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
      //   console.log("subcat" + req.params.subCatId);
      //   const foundProduct = await ProductModel.find().aggregate([
      //     [
      //       {
      //         $lookup: {
      //           from: "categories",
      //           pipeline: [
      //             {
      //               $project: {
      //                 _id: 0,
      //                 productId: "$_id",
      //                 title: "$title",
      //                 description: "$description",
      //                 image: "$image",
      //               },
      //             },
      //           ],
      //           localField: "categoryId",
      //           foreignField: new mongoose.Types.ObjectId(id),
      //           as: "productDetails",
      //         },
      //       },
      //     ],
      //   ]);

      const foundProduct = await ProductModel.find({
        categoryId: id,
        subcategoryId: subCatId,
      })
        .populate("categoryId")
        .sort({ createdOn: -1 });

      if (!foundProduct) {
        return res.json({ success: false, message: "Product Not Found" });
      }
      console.log(foundProduct);
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
      console.log("id" + id);
      //   const foundProduct = await ProductModel.find().aggregate([
      //     [
      //       {
      //         $lookup: {
      //           from: "categories",
      //           pipeline: [
      //             {
      //               $project: {
      //                 _id: 0,
      //                 productId: "$_id",
      //                 title: "$title",
      //                 description: "$description",
      //                 image: "$image",
      //               },
      //             },
      //           ],
      //           localField: "categoryId",
      //           foreignField: new mongoose.Types.ObjectId(id),
      //           as: "productDetails",
      //         },
      //       },
      //     ],
      //   ]);

      const foundProduct = await ProductModel.find({
        userId: id,
      })
        .populate("categoryId")
        .sort({ createdOn: -1 });

      if (!foundProduct) {
        return res.json({ success: false, message: "Product Not Found" });
      }
      console.log(foundProduct);
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
