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