const PropertiesRoutes = require("express").Router();
const PropertiesController = require("./../controllers/properties_controller");
const upload = require("../middleware/upload");

PropertiesRoutes.get("/", PropertiesController.fetchAllProperties);
PropertiesRoutes.post(
  "/",
  upload.array("image[]", 12),
  PropertiesController.createProperties
);
PropertiesRoutes.get("/:id", PropertiesController.fetchPropertiesById);

module.exports = PropertiesRoutes;
