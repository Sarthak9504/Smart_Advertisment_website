const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProductsByCategory,
    getProductByName
} = require("../controllers/products_controller");

router.get("/", getAllProducts);
router.get("/search/:category", getProductsByCategory);
router.get("/name/:name", getProductByName);


module.exports = router;
