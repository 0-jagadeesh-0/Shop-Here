const { uploadImage } = require("../middlewares/upload");
const Product = require("../models/product")
const { cloudinary } = require('../utils/cloudinary');

// CREATE PRODUCT 

const addProduct = async (req, res) => {

    const imageLink = await uploadImage(req.body.previewSource);


    try {
        const newProduct = await Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            size: req.body.size,
            color: req.body.color,
            image: imageLink,
            category: req.body.category,
            adminId: req.body.adminId
        })
        await newProduct.save();
        console.log(newProduct);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(400).json("unable to add product.");
    }
}

// UPDATE PRODUCT 

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });

        res.status(200).json(updatedProduct);


    } catch (error) {
        res.status(400).json("you are not allowed to update.")
    }
}

// DELETE PRODUCT 

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Product.findByIdAndRemove({ _id: id });
        res.status(200).json(`${item.title} deleted successfully.`);
    } catch (error) {
        res.status(400).json("Unable to delete item.")
    }
}

// GET ALL PRODUCTS 

const getAllProducts = async (req, res) => {
    const qcategory = req.query.category;
    const qsize = req.query.size;
    const qcolor = req.query.color;
    try {
        let products;
        if (qcategory) {
            products = await Product.find({
                category: {
                    $in: [qcategory]
                }
            })
        }
        else if (qsize) {
            products = await Product.find({ size: qsize });
        }
        else if (qcolor) {
            products = await Product.find({ color: qcolor });
        }
        else {
            products = await Product.find();
        }

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error);
    }
}

// GET PRODUCT BY ID 

const findProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({ _id: id });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Product not found.");
    }
}

// GET ALL ADMIN PRODUCTS 

const getAdminProducts = async (req, res) => {
    const { id } = req.params;
    try {
        let products = await Product.find({ adminId: id });
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json(error);
    }
}


module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct, findProduct, getAdminProducts };