const ProductRoutes = require("express").Router();
const ProductController = require("../controllers/product_controller");
const upload = require("../middleware/upload");

ProductRoutes.get(
  "/allproduct/:limit?/:skip?/:city?",
  ProductController.fetchAllProduct
);
ProductRoutes.get(
  "/search/:limit?/:skip?/:searchText?",
  ProductController.searchAllProduct
);
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
ProductRoutes.get("/prod/:id", ProductController.fetchProductById);

module.exports = ProductRoutes;
