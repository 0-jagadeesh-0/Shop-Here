import { Box, Container } from '@mui/material';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'

function Cart() {
    return <Box className='cart-container'>
        <Navbar />
        <Container style={{ width: "100vw" }}>
            This Cart is Empty.
        </Container>
    </Box>;
}

export default Cart;
