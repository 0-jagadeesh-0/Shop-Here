const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }



})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;