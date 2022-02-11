import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import './style.scss';
import { getproduct } from '../../api/products';
import { Image } from 'cloudinary-react';
import { addcartitem } from '../../api/cart';

function Product() {

    const id = window.location.pathname.split("/")[2];

    const [product, setProduct] = useState({});



    useEffect(() => {
        const getItem = async () => {
            await getproduct(id).then((res) => {
                setProduct(res.data);
            })
        }
        getItem();
    }, [id]);

    const handleClick = async () => {
        await addcartitem({ quantity: 1, productId: id, userId: localStorage.getItem("userId") }).then((res) => {
            console.log(res);
        })
    }


    return <Box className='main'>
        <Navbar />
        <Box className='product-container'>
            <Image
                className="product-image"
                cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                publicId={product.image}
            />
            <Box className='product-info'>
                <Typography className='product-title' variant='h2'>
                    {product.title}
                </Typography>
                <Typography className='product-desc' variant='h6'>
                    A enzyme washed denim shirt, full sleeves with a chest pocket and metal buttons with a special buttin down collar
                </Typography>
                <Typography variant='h4'>
                    Price: $ {product.price}
                </Typography>
                <Box className='product-details'>
                    <Box className='product-color'>
                        <select>
                            <option value="">Color</option>
                            <option value="">Blue</option>
                            <option value="">Black</option>
                        </select>
                    </Box>
                    <Box className='product-size'>
                        <select>
                            <option value="">Size</option>
                            <option value="">S</option>
                            <option value="">M</option>
                            <option value="">L</option>
                        </select>
                    </Box>
                </Box>
                <Box className='product-order'>
                    <Button variant='contained' onClick={handleClick} disableElevation>
                        Add to cart
                    </Button>
                    <Button variant='contained' disableElevation>
                        Buy Now
                    </Button>
                </Box>

            </Box>
        </Box>
    </Box>;
}

export default Product;
