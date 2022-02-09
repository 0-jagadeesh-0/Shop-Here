const express = require("express");
const { getUser, updateUser, deleteUser } = require("../controllers/user");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/:id", verifyToken, getUser);

router.put("/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/:id", verifyTokenAndAdmin, deleteUser);

module.exports = router;