import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearcart } from '../../api/cart'
import { addorder } from '../../api/order'
import { CartContext } from '../../pages/Cart/cartContext'
import Navbar from '../Navbar/Navbar'
import './style.scss'


function Address() {
    const navigate = useNavigate();
    const { total, cartLength, cartItems, updateCart } = useContext(CartContext);
    const amount = (total - (total * 0.02).toFixed(2));
    const [addressInfo, setaddressInfo] = useState({
        name: '',
        mobile: '',
        address: '',
        pin: ''
    });
    const handleClick = async () => {
        await addorder({ total: amount, len: cartLength, items: cartItems, address: addressInfo }).then((res) => {
            console.log(res);
            clearcart().then((res) => {
                console.log(res);
                navigate('/');
            })
        })
    }
    return (
        <Box className="main">
            <Navbar />
            <Box className="address-container">
                <Typography variant='h4' style={{ margin: "10px 0" }} >
                    Add Address
                </Typography>
                <Box className="input-container" >
                    <TextField
                        label='Name'
                        placeholder='Enter your Name'
                        className='input-field'
                        onChange={(e) => setaddressInfo({ ...addressInfo, name: e.target.value })}
                    />
                    <TextField
                        label='Mobile No'
                        placeholder='Enter your Mobile No'
                        className='input-field'
                        onChange={(e) => setaddressInfo({ ...addressInfo, mobile: e.target.value })}
                    />
                    <TextField
                        label='Address'
                        placeholder='D-No'
                        className='input-field'
                        onChange={(e) => setaddressInfo({ ...addressInfo, address: e.target.value })}
                    />
                    <TextField
                        label='Pincode'
                        placeholder='pincode'
                        className='input-field'
                        onChange={(e) => setaddressInfo({ ...addressInfo, pin: e.target.value })}
                    />
                    <Button color='primary' onClick={handleClick} className='input-field'>
                        Confirm Order.
                    </Button>

                </Box>
            </Box>
        </Box>
    )
}

export default Address