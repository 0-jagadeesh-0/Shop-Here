import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import './style.scss';
import { getproduct } from '../../api/products';
import { Image } from 'cloudinary-react';
import { addcartitem, getusercart } from '../../api/cart';
import { CartContext } from '../../pages/Cart/cartContext';
import { addorder } from '../../api/order';

function Product() {

    const productId = window.location.pathname.split("/")[2];

    const [product, setProduct] = useState({});

    const quantity = 1;

    const { updateCart } = useContext(CartContext);




    useEffect(() => {
        const getItem = async () => {
            await getproduct(productId).then((res) => {
                setProduct(res.data);
            })
        }
        getItem();
    }, [productId]);

    const handleClick = async () => {
        await addcartitem({ quantity, productId, adminId: product.adminId }).then((res) => {
            console.log(res);
        })
        await addorder({ quantity, productId, adminId: product.adminId }).then((res) => {
            console.log(res);
        })
        getusercart().then((res) => {
            updateCart(res.data);
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
                    {product.description}
                </Typography>
                <Typography variant='h4'>
                    Price: ₹ {product.price}
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
                        <Box> Size</Box>
                        <Box className="size-options">

                            {
                                product.size?.map((val) => {
                                    return <Box className="size-option" >{val}</Box>
                                })
                            }
                        </Box>

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
