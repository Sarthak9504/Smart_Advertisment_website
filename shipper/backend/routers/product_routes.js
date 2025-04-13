const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProductsByCategory
} = require("../controllers/products_controller");

router.get("/", getAllProducts);
router.get("/search/:category", getProductsByCategory);

module.exports = router;
