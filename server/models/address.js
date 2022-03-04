const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    }
}, {
    timestamps: true
})

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;