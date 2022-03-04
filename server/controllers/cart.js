const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");

// CREATE CART 

const createCart = async (req, res) => {

    const { id } = req.params;

    try {
        const newCart = await Cart({
            userId: id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });
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

// UPDATE CART ITEM 

const updateCartItem = async (req, res) => {

    try {
        const cartItem = await Cart.findByIdAndUpdate({ _id: req.body.cartId }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(cartItem);

    } catch (error) {
        res.status(400).json(error);
    }
}

// GET USER CART 

const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const products = [];
        const cartItems = await Cart.find({ userId: id }).populate('productId');
        if (cartItems.length === 0) return res.status(203).json({ message: "Cart is Empty." });
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
        res.status(400).json("unable to get data.");

    }
}


// DELETE CART ITEM 

const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Cart.findByIdAndRemove({ _id: id });
        res.status(200).json("Deleted.");
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createCart, getCart, deleteCartItem, updateCartItem };