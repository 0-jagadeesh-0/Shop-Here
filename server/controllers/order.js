const Order = require('../models/order');

// CREATE ORDER 


const addOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const newOrder = await Order({
            userId: id,
            cart: {
                totalQuantity: req.body.len,
                totalAmount: req.body.total,
                items: req.body.items
            },
            address: req.body.address
        });
        await newOrder.save();
        res.status(200).send(newOrder);
    } catch (error) {
        res.status(404).send("error.")
    }
}

// const addOrder = async (req, res) => {

//     const { id } = req.params;

//     try {
//         const newOrder = await Order({
//             userId: id,
//             adminId: req.body.adminId,
//             productId: req.body.productId,
//             quantity: req.body.quantity
//         });
//         const quant = req.body.quantity;
//         const itemExists = await Order.findOne({ productId: req.body.productId });
//         if (itemExists) {
//             const itemQuantity = itemExists.quantity;
//             console.log(itemQuantity);
//             const updateQuantity = await Order.findByIdAndUpdate({ _id: itemExists._id }, {
//                 $set: { quantity: quant + itemQuantity }
//             }, { new: true });
//             const updateOrder = await updateQuantity.save();
//             res.status(200).json(updateOrder);

//         }
//         else {
//             const savedOrder = await newOrder.save();
//             res.status(200).json(savedOrder);
//         }

//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

// GET USER ORDERS 

const getOrders = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.find({ userId: id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json("Something went wrong!");
    }
}

// GET ADMIN ORDERS 

const getAdminOrders = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.find().populate('cart.items.productId');
        let order_items = [];
        orders.forEach(order => {
            order.cart.items.forEach(item => {
                if (item.adminId == id) {
                    order_items.push(item);
                }
            })
        })
        res.status(200).send(order_items);

    } catch (error) {
        res.status(400).json("Something went wrong!")
    }
}

// UPDATE ORDER 

const updateOrder = async (req, res) => {

    const { id } = req.params;

    try {
        const order = await Order.findOneAndUpdate({ userId: id, productId: req.body.productId }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(order);

    } catch (error) {
        res.status(400).json("something went wrong!");
    }
}

// UPDATE ORDER STATUS

const updateStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findByIdAndUpdate({ _id: id }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(order);

    } catch (error) {
        res.status(400).json("something went wrong!");

    }
}

// DELETE ORDER 

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findOneAndRemove({ userId: id, productId: req.body.productId });
        console.log(orders);
        res.status(200).json("Deleted.");
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = { addOrder, updateStatus, getOrders, getAdminOrders, deleteOrder, updateOrder };
