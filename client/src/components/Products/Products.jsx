import { Box, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getallproducts } from '../../api/products';
import Navbar from '../Navbar/Navbar';
import { Image } from 'cloudinary-react';
import './style.scss'

function Products() {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();
    const category = window.location.pathname.split("/")[2];
    console.log(category);





    useEffect(() => {
        getallproducts(category).then((res) => {
            setProducts(res.data);
        })
    }, [category]);





    return <Box className='main'>
        <Navbar />
        <Box className='products-container'>
            {
                products.map((val) => {
                    return <Paper square elevation={4} className='item' onClick={() => { navigate(`/product/${val._id}`) }} style={{ margin: "1%", cursor: "pointer" }} key={val._id}>

                        <Image className='item-image' cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME} publicId={val.image} alt="" />
                        <Box className='item-hover'></Box>
                        <Box className='item-details'>
                            <Typography style={{ fontWeight: "bold" }}>
                                {val.title}
                            </Typography>
                            <Typography >
                                {val.description}
                            </Typography>

                            <Typography >
                                $ {val.price}
                            </Typography>
                        </Box>

                    </Paper>
                })
            }
        </Box>
    </Box>;
}

export default Products;
