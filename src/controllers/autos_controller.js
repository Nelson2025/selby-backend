const AutosModel = require("../models/autos_model");
const express = require("express");

const AutosController = {
  createAutos: async function (req, res) {
    try {
      const autosData = req.body;
      const newAutos = new AutosModel({
        categoryId: autosData.categoryId,
        userId: autosData.userId,
        brand: autosData.brand,
        model: autosData.model,
        variant: autosData.variant,
        year: autosData.year,
        fuel: autosData.fuel,
        transmission: autosData.transmission,
        kms: autosData.kms,
        owner: autosData.owner,
        title: autosData.title,
        description: autosData.description,
        price: autosData.price,
        landmark: autosData.landmark,
        city: autosData.city,
        state: autosData.state,
        status: autosData.status,
      });
      if (req.files) {
        let images = [];
        let path = "";
        req.files.forEach(function (files, index, arr) {
          //  path = path + files.path + ",";
          images.push(files.path);
        });
        // path = path.substring(0, path.lastIndexOf(","));
        newAutos.image = images;
      }
      //   if (req.file) {
      //     newAutos.image = req.file.path;
      //   }
      await newAutos.save();
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
        data: newAutos,
        message: "Autos Created",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAllAutos: async function (req, res) {
    try {
      // const autos = await AutosModel.find();
      const autos = await AutosModel.aggregate([
        {
          $unionWith: "properties",
        },
      ]).sort({ createdOn: -1 });
      return res.json({
        success: true,
        data: autos,
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  fetchAutosById: async function (req, res) {
    try {
      const id = req.params.id;
      const foundAutos = await AutosModel.findById(id);

      if (!foundAutos) {
        return res.json({ success: false, message: "Autos Not Found" });
      }

      return res.json({
        success: true,
        data: [foundAutos],
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};

module.exports = AutosController;
