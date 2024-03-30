const ProductRoutes = require("express").Router();
const ProductController = require("../controllers/product_controller");
const upload = require("../middleware/upload");

ProductRoutes.get("/", ProductController.fetchAllProduct);
ProductRoutes.get(
  "/productByCatId/:id/:subCatId?",
  ProductController.fetchProductByCategoryId
);
ProductRoutes.get(
  "/allProductByUserId/:id",
  ProductController.fetchAllProductByUserId
);
ProductRoutes.post(
  "/createProduct",
  upload.array("image[]", 12),
  ProductController.createProduct
);
// ProductRoutes.post(
//   "/properties/forSaleHousesApartments",
//   upload.array("image[]", 12),
//   ProductController.createPropertiesForSaleHousesApartments
// );
// ProductRoutes.post(
//   "/properties/forRentHousesApartments",
//   upload.array("image[]", 12),
//   ProductController.createPropertiesForRentHousesApartments
// );
ProductRoutes.get("/:id", ProductController.fetchProductById);

module.exports = ProductRoutes;
