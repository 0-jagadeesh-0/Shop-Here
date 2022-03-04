const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number
    },
    status: {
        type: String,
        default: "Ordered"
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;