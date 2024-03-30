const AutosRoutes = require("express").Router();
const AutosController = require("./../controllers/autos_controller");
const upload = require("../middleware/upload");

AutosRoutes.get("/", AutosController.fetchAllAutos);
AutosRoutes.post("/", upload.array("image[]", 12), AutosController.createAutos);
AutosRoutes.get("/:id", AutosController.fetchAutosById);

module.exports = AutosRoutes;
