const express = require("express");
const { getAllProducts, addProduct, updateProduct, deleteProduct, findProduct, getAdminProducts } = require("../controllers/product");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();


router.post("/add/:id", verifyTokenAndAdmin, addProduct);

router.put("/:id", verifyTokenAndAdmin, updateProduct);

router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

router.get("/", getAllProducts);

router.get("/:id", findProduct);

router.get("/myproducts/:id", verifyTokenAndAdmin, getAdminProducts);

module.exports = router;