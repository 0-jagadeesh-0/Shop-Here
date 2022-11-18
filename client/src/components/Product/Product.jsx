import { Alert, Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import './style.scss';
import { getproduct } from '../../api/products';
import { Image } from 'cloudinary-react';
import { addcartitem, getusercart } from '../../api/cart';
import { CartContext } from '../../pages/Cart/cartContext';
import { addorder } from '../../api/order';
import { useNavigate } from 'react-router-dom';

function Product() {

    const navigate = useNavigate();

    const productId = window.location.pathname.split("/")[2];

    const [product, setProduct] = useState({});

    const [loginpop, setloginpop] = useState(false);

    const [color, setcolor] = useState('white');

    const colorChange = () => {
        setcolor('blue');
    }
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


    const buyNow = async () => {
        if (localStorage.getItem("token") !== "") {
            await addcartitem({ quantity, productId, adminId: product.adminId }).then((res) => {
                console.log("Item added to cart.");

            })
            getusercart().then((res) => {
                updateCart(res.data);
                navigate('/cart');
            })

        }
    }

    const handleClick = async () => {

        if (localStorage.getItem("token") !== "") {
            await addcartitem({ quantity, productId, adminId: product.adminId }).then((res) => {
                console.log("Item added to cart.");

            })
            getusercart().then((res) => {
                updateCart(res.data);
            })

        }
        else {
            setloginpop(true);
            setTimeout(() => setloginpop(false), 3000);
        }

    }


    return <Box className='main'>
        <Navbar />
        {loginpop && <Alert variant="filled" severity="info" style={{ justifyContent: "center" }} >Login to add item to Cart.</Alert>}
        <Box className='product-container'>
            <Box className='product-img' >
                <Image
                    className="product-image"
                    cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                    publicId={product.image}
                />
            </Box>

            <Box className='product-info'>
                <Typography className='product-title' variant='h2'>
                    {product.title}
                </Typography>
                <Typography className='product-desc' variant='h6'>
                    {product.description}
                </Typography>
                <Typography className='product-price' variant='h4'>
                    Price: ₹ {product.price}
                </Typography>
                <Box className='product-details'>
                    {/* <Box className='product-color'>
                        <select>
                            <option value="">Color</option>
                            <option value="">Blue</option>
                            <option value="">Black</option>
                        </select>
                    </Box> */}
                    <Box className='product-size'>
                        <Box> Size</Box>
                        <Box className="size-options">

                            {
                                product.size?.map((val, index) => {
                                    return <Box className="size-option" style={{ backgroundColor: `${color}` }} key={index} >{val}</Box>
                                })
                            }
                        </Box>

                    </Box>
                </Box>
                <Box className='product-order'>
                    <Button className='btn' variant='contained' onClick={handleClick} disableElevation>
                        Add to cart
                    </Button>
                    <Button className='btn' onClick={buyNow} variant='contained' disableElevation>
                        Buy Now
                    </Button>
                </Box>

            </Box>
        </Box>
    </Box>;
}

export default Product;
