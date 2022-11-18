const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart: {
        totalQuantity: {
            type: Number
        },
        totalAmount: {
            type: Number
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
    },
    address: Object,
    status: {
        type: String,
        default: "Ordered"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);


module.exports = Order;