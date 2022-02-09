import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

function CategoryCard() {
    return <Box className='category-container'>
        <Link to={"/login"}>
            <img className='category-image' src="" alt='' />
            <Box>
                <Typography>
                    {/* Hello */}
                </Typography>
                <Button variant='contained' color="primary">
                    {/* SHOP NOW */}
                </Button>
            </Box>
        </Link>
    </Box>
}

export default CategoryCard;
