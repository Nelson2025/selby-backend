const CategoryRoutes = require("express").Router();
const CategoryController = require("./../controllers/category_controller");
const upload = require("../middleware/upload");

CategoryRoutes.get("/", CategoryController.fetchAllCategories);
CategoryRoutes.post(
  "/",
  upload.single("image"),
  CategoryController.createCategory
);
CategoryRoutes.get("/:id", CategoryController.fetchCategoryById);
CategoryRoutes.put(
  "/:id",
  upload.single("image"),
  CategoryController.updateCategory
);

module.exports = CategoryRoutes;
