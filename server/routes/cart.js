const express = require("express");
const { createCart } = require("../controllers/cart");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/add", verifyToken, createCart);

module.exports = router;