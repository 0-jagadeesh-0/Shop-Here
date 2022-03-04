const express = require("express");
const { createCart, getCart, deleteCartItem, updateCartItem } = require("../controllers/cart");
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/add/:id", verifyToken, createCart);

router.get("/:id", verifyTokenAndAuthorization, getCart);

router.put("/:id", verifyTokenAndAuthorization, updateCartItem);

router.delete("/:id", verifyToken, deleteCartItem);

module.exports = router;