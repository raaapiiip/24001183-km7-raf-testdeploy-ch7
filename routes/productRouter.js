const router = require("express").Router();
const upload = require("../middlewares/uploader");
const { Product } = require("../models");
const productController = require("../controllers/productController");
const Authenticate = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");
const checkOwnership = require("../middlewares/checkOwnership");
const checkId = require("../middlewares/checkId");

router.post(
  "/",
  Authenticate,
  checkRole(["Admin", "Manager"]),
  upload.array("images"),
  productController.createProduct
);
router.get("/", Authenticate, productController.findProducts);
router.get(
  "/:id",
  Authenticate,
  checkId(Product),
  productController.findProductById
);
router.patch(
  "/:id",
  Authenticate,
  checkId(Product),
  checkRole(["Admin", "Manager"]),
  checkOwnership,
  upload.array("images"),
  productController.UpdateProduct
);
router.delete(
  "/:id",
  Authenticate,
  checkId(Product),
  checkRole(["Admin", "Manager"]),
  checkOwnership,
  productController.deleteProduct
);

module.exports = router;
