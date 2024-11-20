const router = require("express").Router();
const upload = require("../middlewares/uploader");
const Admin = require("../controllers/adminController");

router.get("/dashboard/admin", Admin.findProducts);
router.get("/dashboard/admin/create", Admin.createPage);
router.post("/products/create", upload.single("image"), Admin.createProduct);

module.exports = router;
