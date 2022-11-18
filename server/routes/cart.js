const express = require("express");
const { createCart, getCart, deleteCartItem, updateCartItem, clearCart } = require("../controllers/cart");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/add/:id", verifyTokenAndAuthorization, createCart);

router.get("/:id", verifyTokenAndAuthorization, getCart);

router.put("/:id", verifyTokenAndAuthorization, updateCartItem);

router.post("/delete/:id", verifyTokenAndAuthorization, deleteCartItem);

router.delete("/clear/:id", verifyToken, clearCart);

module.exports = router;