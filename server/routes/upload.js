const express = require("express");
const { uploadImage, deleteImage } = require("../middlewares/upload");
const router = express.Router();

router.post("/upload", uploadImage);

router.post("/delete", deleteImage);

module.exports = router;
