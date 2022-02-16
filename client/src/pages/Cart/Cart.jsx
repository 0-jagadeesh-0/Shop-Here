import { Box, Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { deleteitem, getusercart } from '../../api/cart';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'
import { Image } from 'cloudinary-react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Navigate } from 'react-router-dom';
import { CartContext } from './cartContext';



function Cart() {
    const { cartItems, updateCart } = useContext(CartContext);
    // console.log(cartItems);

    const [empty, setEmpty] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [sum, setsum] = useState(0)

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
    }, [updateCart]);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    }
    const handleDecrease = () => {
        setQuantity(quantity - 1);
    }

    const handleRemove = (id) => {
        deleteitem(id).then((res) => {
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
                                    {val.title}
                                </Typography>
                                <Box className="product-quantity">
                                    <AddCircleOutlineOutlinedIcon onClick={handleIncrease} style={{ cursor: "pointer" }} />
                                    <Typography>

                                        {val.quant}
                                    </Typography>
                                    <RemoveCircleOutlineOutlinedIcon onClick={handleDecrease} style={{ cursor: "pointer" }} />
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
                    <Box className="checkout-box">
                        <Typography>
                            Total Items
                        </Typography>
                        <Typography>
                            Tax
                        </Typography>
                        <Typography>
                            Discount
                        </Typography>
                        <Typography>
                            Sub Total = {sum}
                        </Typography>
                        <Button variant="contained" color="primary" disableElevation>
                            Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>

        }

    </Box> : <Navigate to="/" />}</>
}

export default Cart;
