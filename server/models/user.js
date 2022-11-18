const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

userSchema.methods.validateUser = (data, cb) => {
    console.log(data);
    let res = 'No';
    return cb(null, res);
}

const User = mongoose.model("User", userSchema);


module.exports = User;