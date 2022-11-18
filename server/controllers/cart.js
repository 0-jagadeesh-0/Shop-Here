const Cart = require("../models/cart");
const Product = require("../models/product");
const mongoose = require("mongoose");

// CREATE CART 

const createCart = async (req, res) => {

    const { id } = req.params;

    try {
        if (!id) return res.status(400).json("Login to add Item.")
        const quant = req.body.quantity;
        const pId = req.body.productId;
        // const itemExists = await Cart.findOne({ userId: id, productId: req.body.productId });
        // if (itemExists) {
        //     const itemQuantity = itemExists.quantity;
        //     console.log(itemQuantity);
        //     const updateQuantity = await Cart.findByIdAndUpdate({ _id: itemExists._id }, {
        //         $set: { quantity: quant + itemQuantity }
        //     }, { new: true });
        //     const updateItem = await updateQuantity.save();
        //     res.status(200).json(updateItem);

        // }
        // else {
        //     const savedCart = await newCart.save();
        //     res.status(200).json(savedCart);
        // }
        let item = {
            adminId: req.body.adminId,
            productId: req.body.productId,
            quantity: req.body.quantity
        };
        let user_cart = await Cart.findOne({ userId: id });
        if (user_cart) {
            const itemIdx = await user_cart.items.findIndex((p) => p.productId == pId);
            if (itemIdx > -1) {
                user_cart.items[itemIdx].quantity += quant;

            }
            else {
                user_cart.items.push(item);
            }
            await user_cart.save();
            res.status(200).json(user_cart);
        }
        else {

            const newCart = await Cart({
                userId: id,
                items: [
                    item
                ]
            });
            const savedCart = await newCart.save();
            res.status(200).json(savedCart);
        }

    } catch (error) {
        res.status(400).json(error);
    }
}

// UPDATE CART ITEM 

const updateCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const idx = req.body.index;
        const quantity = req.body.quantity;
        console.log(idx);
        const user_cart = await Cart.findOne({ userId: id });
        if (quantity <= 0) {
            user_cart.items.remove({ _id: user_cart.items[idx]._id });
        }
        else {
            user_cart.items[idx].quantity = quantity;
        }

        await user_cart.save();
        res.status(200).json(user_cart);

    } catch (error) {
        res.status(400).json(error);
    }
}

// GET USER CART 

const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        let total = 0;
        const user_cart = await Cart.find({ userId: id }).populate('items.productId');
        const cartItems = user_cart[0].items;
        cartItems.forEach(item => {
            const price = (Number)(item.productId.price);
            const q = item.quantity;
            total += (price * q);
        })
        res.status(200).json({ cartItems, total });

    } catch (error) {
        res.status(400).json("unable to get data.");

    }
}


// DELETE CART ITEM 

const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const idx = req.body.id;
        console.log(idx);
        const user_cart = await Cart.findOne({ userId: id });
        user_cart.items.remove({ _id: user_cart.items[idx]._id });
        await user_cart.save();
        res.status(200).json("Deleted.");
    } catch (error) {
        res.status(400).json(error);
    }
}

const clearCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cartitems = await Cart.deleteMany({ userId: id });

        res.status(200).send("Deleted.")
    } catch (error) {

    }
}

module.exports = { createCart, getCart, deleteCartItem, updateCartItem, clearCart };