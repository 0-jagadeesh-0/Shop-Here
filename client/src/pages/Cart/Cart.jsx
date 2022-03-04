import { Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { deleteitem, getusercart, updatecart } from '../../api/cart';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'
import { Image } from 'cloudinary-react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Navigate } from 'react-router-dom';
import { CartContext } from './cartContext';
import { deleteorder } from '../../api/order';



function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);

    const [empty, setEmpty] = useState(false);
    const [sum, setsum] = useState(0);
    const discount = (sum * 0.02).toFixed(2);

    useEffect(() => {
        let total = 0;

        getusercart().then((res) => {
            if (res.status === 203) {
                setEmpty(true);
            }
            else {
                updateCart(res.data);
            }
        })
        const findSum = () => {

            cartItems.forEach(item => {
                total += (item.quant * item.price);
            });
        }
        findSum();
        setsum(total);
    }, [cartItems, updateCart]);

    const handleIncrease = (id, value) => {
        updatecart({ cartId: id, quantity: (value + 1) }).then((res) => {
            console.log(res.data);
        })
    }
    const handleDecrease = (id, value) => {
        updatecart({ cartId: id, quantity: (value - 1) }).then((res) => {
            console.log(res.data);
        })
    }

    const handleRemove = (id) => {
        deleteitem(id).then((res) => {
            console.log(res);
        })
        deleteorder(id).then((res) => {
            console.log(res);
        })
    }






    return <>{localStorage.getItem("token") ? <Box className='cart-container'>
        <Navbar />
        {
            empty ? <Container style={{ width: "100vw" }}>
                This Cart is Empty.
            </Container> : <Box className="cart">
                <Box className='cart-products'>
                    {
                        cartItems.map((val, index) => {
                            return <Box key={index} className="cart-item">
                                <Image
                                    cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                                    publicId={val.image}
                                    width="150px"
                                    height="150px"
                                />
                                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                                    {val.title}<br />
                                    <span style={{ fontWeight: "normal", fontSize: "1rem" }}>{val.description}</span>
                                </Typography>
                                <Box className="product-quantity">
                                    <AddCircleOutlineOutlinedIcon onClick={() => { handleIncrease(val.cartId, val.quant) }} style={{ cursor: "pointer" }} />
                                    <Typography>

                                        {val.quant}
                                    </Typography>
                                    <RemoveCircleOutlineOutlinedIcon onClick={() => { handleDecrease(val.cartId, val.quant) }} style={{ cursor: "pointer" }} />
                                </Box>
                                <Box style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography style={{ margin: "10px 0", fontWeight: "600" }}>
                                        {val.quant * val.price}
                                    </Typography>
                                    <Button variant="contained" style={{ backgroundColor: "red" }} size="small" disableElevation onClick={() => { handleRemove(val.cartId) }}>
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
                            Total MRP : ₹{sum}
                        </Typography>
                        <Typography className='checkout-item'>
                            Discount on MRP : ₹{discount}
                        </Typography>
                        <hr />
                        <Typography className='checkout-item'>
                            <span style={{ fontWeight: "bold" }}>Total Amount :</span>  ₹{sum - discount}
                        </Typography>
                        <hr />
                        <Button className='checkout-item' size="small" variant="contained" color="primary" disableElevation>
                            place order
                        </Button>
                    </Paper>
                </Box>
            </Box>

        }

    </Box> : <Navigate to="/" />}</>
}

export default Cart;
