const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");

// CREATE CART 

const createCart = async (req, res) => {
    try {
        const newCart = await Cart(req.body);
        const quant = req.body.quantity;
        const itemExists = await Cart.findOne({ productId: req.body.productId });
        if (itemExists) {
            const itemQuantity = itemExists.quantity;
            console.log(itemQuantity);
            const updateQuantity = await Cart.findByIdAndUpdate({ _id: itemExists._id }, {
                $set: { quantity: quant + itemQuantity }
            }, { new: true });
            const updateItem = await updateQuantity.save();
            res.status(200).json(updateItem);

        }
        else {
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }

    } catch (error) {
        res.status(400).json(error);
    }
}

const addItem = async (req, res) => {
    const { id } = req.params;
    try {
        const newItem = Cart({
            items: [{
                productId: req.body.productId
            },
            {
                quantity: req.body.quantity
            }

            ]
        })
    } catch (error) {

    }
}

// GET USER CART 

const getCart = async (req, res) => {
    try {
        const products = [];
        const cartItems = await Cart.find({ userId: req.params.id }).populate('productId');
        // if (cartItems.length === 0) return res.status(203).json({ message: "Cart is Empty." });
        cartItems.forEach(product => {
            const cartId = product._id;
            const title = product.productId.title;
            const description = product.productId.description;
            const image = product.productId.image;
            const price = product.productId.price;
            const quant = product.quantity;
            const data = { title, cartId, description, price, image, quant };
            products.push(data);
        })

        res.status(200).json(products);

    } catch (error) {
        res.status(400).json(error);

    }
}

const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Cart.findByIdAndRemove({ _id: id });
        res.status(200).json("Deleted.");
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createCart, addItem, getCart, deleteCartItem };