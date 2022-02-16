const { cloudinary } = require("../utils/cloudinary");


const uploadImage = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            upload_preset: "shop-here-images"
        })

        return uploadResponse.public_id;

    } catch (error) {
        return '';
    }
}

const deleteImage = async (req, res) => {
    const id = req.body.publicId;
    console.log(id);
    try {
        await cloudinary.uploader.destroy(id);
        res.status(200).json("Deleted Image.");
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { uploadImage, deleteImage };