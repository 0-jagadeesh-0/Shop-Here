const Order = require('../models/order');

// CREATE ORDER 

const addOrder = async (req, res) => {

    const { id } = req.params;

    try {
        const newOrder = await Order({
            userId: id,
            productId: req.body.productId,
            quantity: req.body.quantity
        });
        const quant = req.body.quantity;
        const itemExists = await Order.findOne({ productId: req.body.productId });
        if (itemExists) {
            const itemQuantity = itemExists.quantity;
            console.log(itemQuantity);
            const updateQuantity = await Order.findByIdAndUpdate({ _id: itemExists._id }, {
                $set: { quantity: quant + itemQuantity }
            }, { new: true });
            const updateOrder = await updateQuantity.save();
            res.status(200).json(updateOrder);

        }
        else {
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        }

    } catch (error) {
        res.status(400).json(error);
    }
}

// GET USER ORDERS 

const getOrders = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.find({ userId: id }).populate('productId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json("Something went wrong!");
    }
}

// GET ADMIN ORDERS 

const getAdminOrders = async (req, res) => {
    const { id } = req.params;
    try {
        const adminOrders = new Map();
        const orders = await Order.find().populate('productId');
        orders.forEach(order => {
            (order.productId.adminId === id)
            {
                if (adminOrders.get(order.productId) !== undefined) {
                    adminOrders[order.productId]++;
                }
                else {
                    adminOrders.set(order.productId, 1);
                }
            }
            res.status(200).json(adminOrders);
        })
    } catch (error) {
        res.status(400).json("Something went wrong!")
    }
}

// UPDATE ORDER 

const updateOrder = async (req, res) => {

    try {
        const order = await Order.findByIdAndUpdate({ _id: req.body.cartId }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(order);

    } catch (error) {
        res.status(400).json(error);
    }
}

// DELETE ORDER 

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Order.findByIdAndRemove({ _id: id });
        res.status(200).json("Deleted.");
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { addOrder, getOrders, getAdminOrders, deleteOrder, updateOrder };
