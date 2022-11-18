const express = require("express");
const { addOrder, getOrders, updateOrder, deleteOrder, getAdminOrders, updateStatus } = require("../controllers/order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const router = express.Router();


router.post("/add/:id", verifyToken, addOrder);
router.get("/:id", verifyTokenAndAuthorization, getOrders);
router.get("/admin/:id", verifyTokenAndAdmin, getAdminOrders);
router.put("/:id", verifyTokenAndAuthorization, updateOrder);
router.delete("remove/:id", verifyToken, deleteOrder);
router.put("/update/status/:id", verifyTokenAndAdmin, updateStatus);

module.exports = router;