import { Box, Button, Container, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { deleteitem, getusercart } from '../../api/cart';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'
import { Image } from 'cloudinary-react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Navigate } from 'react-router-dom';

function Cart() {

    const [empty, setEmpty] = useState(false);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        getusercart().then((res) => {
            if (res.status === 203) {
                setEmpty(true);
            }
            else {
                setProducts(res.data);
            }
        })
    }, [products])

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
            </Container> : <Box className='cart-products'>
                {
                    products.map((val, index) => {
                        return <Box key={index} className="cart-item">
                            <Image
                                cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                                publicId={val.image}
                                width="150px"
                                height="150px"
                            />
                            <Typography>
                                {val.title}
                            </Typography>
                            <Box className="product-quantity">
                                <AddCircleOutlineOutlinedIcon onClick={handleIncrease} style={{ cursor: "pointer" }} />
                                <Typography>

                                    {val.quant}
                                </Typography>
                                <RemoveCircleOutlineOutlinedIcon onClick={handleDecrease} style={{ cursor: "pointer" }} />
                            </Box>
                            <Box>
                                <Typography>
                                    {val.quant * val.price}
                                </Typography>
                                <Button onClick={() => { handleRemove(val.cartId) }}>
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                    })
                }
            </Box>
        }

    </Box> : <Navigate to="/" />}</>
}

export default Cart;
