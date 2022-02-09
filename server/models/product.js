const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: Array
    },
    price: {
        type: String
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;