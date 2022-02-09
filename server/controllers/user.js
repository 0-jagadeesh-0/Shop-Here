const User = require("../models/user");

// GET USER 

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
        const firstName = user.firstName;
        const lastName = user.lastName;
        const username = user.username;
        const email = user.email;
        const data = { firstName, lastName, username, email };
        res.status(200).json(data);
    }
    else {
        res.status(400).json("User not Found.");
    }
}

// UPDATE USER 

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await User.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        },
            { new: true }
        )
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json(error);
    }
}

// DELETE USER 

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = User.findByIdAndRemove({ _id: id });
        res.status(200).json(`${user.firstName} deleted successfully.`);
    } catch (error) {
        res.status(400).json("Unable to delete user.")
    }
}


module.exports = { getUser, updateUser, deleteUser };