const PropertiesModel = require("../models/properties_model");
const express = require("express");

const PropertiesController = {
  createProperties: async function (req, res) {
    try {
      const propertiesData = req.body;
      const newProperties = new PropertiesModel({
        categoryId: propertiesData.categoryId,
        userId: propertiesData.userId,
        type: propertiesData.type,
        bedrooms: propertiesData.bedrooms,
        bathrooms: propertiesData.bathrooms,
        furnishing: propertiesData.furnishing,
        constructionStatus: propertiesData.constructionStatus,
        listedBy: propertiesData.listedBy,
        superBuiltupArea: propertiesData.superBuiltupArea,
        carpetArea: propertiesData.carpetArea,
        maintenanceMonthly: propertiesData.maintenanceMonthly,
        totalFloors: propertiesData.totalFloors,
        floorNo: propertiesData.floorNo,
        carParking: propertiesData.carParking,
        facing: propertiesData.facing,
        projectName: propertiesData.projectName,
        title: propertiesData.title,
        description: propertiesData.description,
        price: propertiesData.price,
        landmark: propertiesData.landmark,
        city: propertiesData.city,
        state: propertiesData.state,
        status: propertiesData.status,
      });
      if (req.files) {
        let images = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          //  path = path + files.path + ",";
          images.push(files.path);
        });
        // path = path.substring(0, path.lastIndexOf(","));
        newProperties.image = images;
      }
      //   if (req.file) {
      //     newAutos.image = req.file.path;
      //   }
      await newProperties.save();
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
        data: newProperties,
        message: "Autos Created",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllProperties: async function (req, res) {
    try {
      const properties = await PropertiesModel.find();
      return res.json({
        success: true,
        data: properties,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchPropertiesById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundProperties = await PropertiesModel.findById(id);

      if (!foundProperties) {
        return res.json({ success: false, message: "Autos Not Found" });
      }

      return res.json({
        success: true,
        data: [foundProperties],
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = PropertiesController;
