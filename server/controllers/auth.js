const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/generateToken');

const register = async (req, res) => {
    try {
        const newUser = await User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        });
        newUser.save();
        res.status(200).json("success");

    } catch (error) {
        res.status(401).json(error);
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            let token = generateToken(user._id);
            let id = user._id;
            let admin = user.isAdmin;
            const data = { token, id, admin };
            res.status(200).json(data);
        }
        else {
            res.status(404).json("Invalid Credentials.");
        }
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { register, login };