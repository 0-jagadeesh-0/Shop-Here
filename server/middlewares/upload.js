const { cloudinary } = require("../utils/cloudinary");


const uploadImage = async (req, res) => {
    try {
        const file = req.body.data;
        const uploadResponse = cloudinary.uploader.upload(file, {
            upload_preset: "shop-here-images"
        })
        console.log((await uploadResponse).public_id);
        res.status(200).json((await uploadResponse).public_id);

    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { uploadImage };