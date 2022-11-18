import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { deleteitem, getusercart, updatecart } from '../../api/cart';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'
import { Image } from 'cloudinary-react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Navigate, useNavigate } from 'react-router-dom';
import { CartContext } from './cartContext';
import { deleteorder, updateorder } from '../../api/order';
import EmptyCart from './EmptyCart';



function Cart() {


    const { total, cartItems, updateCart } = useContext(CartContext);
    const [update, setupdate] = useState(false);

    const discount = (total * 0.02).toFixed(2);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("deleted");
        getusercart().then((res) => {
            updateCart(res.data);
        })
    }, [update])




    const handleIncrease = (idx, value) => {

        updatecart({ index: idx, quantity: (value + 1) }).then((res) => {
            console.log(res.data);
            setupdate(!update);
        })

    }
    const handleDecrease = (idx, value) => {

        updatecart({ index: idx, quantity: (value - 1) }).then((res) => {
            console.log(res.data);
            setupdate(!update);
        })


    }

    const handleRemove = async (idx) => {
        await deleteitem({ id: idx }).then((res) => {
            console.log(res.data);
            setupdate(!update);
        })
    }






    return <>{localStorage.getItem("token") !== null ? <Box className='cart-container'>
        <Navbar />

        <Box className="cart">
            {cartItems.length > 0 ?

                <> <Box className='cart-products'>
                    {
                        cartItems.map((val, index) => {
                            return <Box key={index} className="cart-item">
                                <Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                                    publicId={val.productId.image}
                                    width="150px"
                                    height="150px"
                                />
                                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                                    {val.productId.title}<br />
                                    <span style={{ fontWeight: "normal", fontSize: "1rem" }}>{val.productId.description}</span>
                                </Typography>
                                <Box className="product-quantity">
                                    <AddCircleOutlineOutlinedIcon onClick={() => { handleIncrease(index, val.quantity) }} style={{ cursor: "pointer" }} />
                                    <Typography>

                                        {val.quantity}
                                    </Typography>
                                    <RemoveCircleOutlineOutlinedIcon onClick={() => { handleDecrease(index, val.quantity) }} style={{ cursor: "pointer" }} />
                                </Box>
                                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography style={{ margin: "10px 0", fontWeight: "600" }}>
                                        {val.quantity * val.productId.price}
                                    </Typography>
                                    <Button variant="contained" style={{ backgroundColor: "red" }} size="small" disableElevation onClick={() => { handleRemove(index) }}>
                                        Remove
                                    </Button>
                                </Box>
                            </Box>
                        })
                    }
                </Box>
                    <Box className="checkout">
                        <Paper className="checkout-box" elevation={3}>
                            <Typography className='checkout-item'>
                                <span style={{ fontWeight: "bold" }}>Price Details({cartItems.length} Items)</span>
                            </Typography>

                            <Typography className='checkout-item'>
                                Total MRP : ₹{total}
                            </Typography>
                            <Typography className='checkout-item'>
                                Discount on MRP : ₹{discount}
                            </Typography>
                            <hr />
                            <Typography className='checkout-item'>
                                <span style={{ fontWeight: "bold" }}>Total Amount :</span>  ₹{total - discount}
                            </Typography>
                            <hr />
                            <Button onClick={() => navigate('/address')} className='checkout-item' size="small" variant="contained" color="primary" disableElevation>
                                Place order
                            </Button>
                        </Paper>
                    </Box></> : <EmptyCart />
            }
        </Box>



    </Box> : <Navigate to="/" />}</>
}

export default Cart;
