import { Box } from '@mui/material';
import React from 'react';
import Category from '../Category/Category';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Slider from '../Slider/Slider';

function LandingPage() {
    return <Box className='landing-page'>
        <Navbar />
        <Slider />
        <Category />
        <Footer />
    </Box>
}

export default LandingPage;
