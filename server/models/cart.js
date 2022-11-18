const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            adminId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;