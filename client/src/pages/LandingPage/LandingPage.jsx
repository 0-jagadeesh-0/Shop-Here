import { Box } from '@mui/material';
import React from 'react';
import Slider from '../../components/Slider/Slider';
import Category from '../../components/Category/Category';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

function LandingPage() {
    return <Box className='landing-page'>
        <Navbar />
        <Slider />
        <Category />
        <Footer />
    </Box>
}

export default LandingPage;
