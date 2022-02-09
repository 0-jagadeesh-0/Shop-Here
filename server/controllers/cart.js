const Cart = require("../models/cart");
const mongoose = require("mongoose");

// CREATE CART 

const createCart = async (req, res) => {
    try {
        const newCart = await Cart({
            userId: req.body.userId,
            items: [
                {
                    productId: req.body.productId
                },
                {
                    quantity: req.body.quantity
                }

            ]
        })
        res.status(200).json(newCart);
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

module.exports = { createCart };