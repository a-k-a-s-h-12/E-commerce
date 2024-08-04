const express = require("express");
const formidable = require("express-formidable");
const router = express.Router();
const checkId = require("../middlewares/checkId.js");
const productsController = require("../controllers/productsController.js");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authenticate.js");

router
  .route("/")
  .get(productsController.fetchProducts)
  .post(
    authenticate,
    authorizeAdmin,
    formidable(),
    productsController.addProducts
  );
router.route("/allproducts").get(productsController.fetchAllProducts);
router.route('/:id/reviews').post(authenticate, productsController.addProductReviews);
router.route('/top').get(productsController.fetchTopProducts);
router.route('/new').get(productsController.fetchNewProducts);
router
  .route("/:id")
  .get(productsController.fetchById)
  .put(
    authenticate,
    authorizeAdmin,
    formidable(),
    productsController.updateProductDetails
  )
  .delete(authenticate, authorizeAdmin, productsController.removeProduct);
router.route("/filtered-products").post(productsController.filterProduct);

module.exports = router;
