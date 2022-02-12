import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import './style.scss'

function CategoryCard({ image, category }) {
    return <Box className='category-container'>

        <img className='category-image' src={image} alt='' />

        <Typography className='category-text'>
            {category}
        </Typography>
        <Button className='category-btn' variant='contained' color="primary" disableElevation>
            SHOP NOW
        </Button>


    </Box>
}

export default CategoryCard;
