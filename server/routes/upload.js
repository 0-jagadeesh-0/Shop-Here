const express = require("express");
const { uploadImage } = require("../middlewares/upload");
const router = express.Router();

router.post("/", uploadImage);

module.exports = router;