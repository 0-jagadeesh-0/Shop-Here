import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteproduct, getadminproducts } from '../../api/products';
import './style.scss'
import { Image } from 'cloudinary-react';
import Navbar from '../../components/Navbar/Navbar';

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getadminproducts(localStorage.getItem("userId")).then((res) => {
            setProducts(res.data);
        })
    }, [products]);

    const handleDelete = (productId) => {
        deleteproduct(productId).then((res) => {
            console.log(res);
        })

    }

    const handleUpdate = (productId) => {
        navigate(`/update`);
    }


    return <>{localStorage.getItem("isAdmin") === "true" ? <>
        <Navbar />
        <Box className='admin-products-container'>
            {
                products.map((val) => {
                    return <Box className='admin-product' key={val._id}>
                        <Image className='product-image' cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME} publicId={val.image} />
                        <Box>
                            <Typography className="product-brand">
                                {val.title}
                            </Typography>
                            <Typography className="product-description">
                                {val.description}
                            </Typography>
                        </Box>
                        <Box className='product-handle-btn'>
                            <Button onClick={() => { handleDelete(val._id) }} size='small' variant='contained' color='secondary' disableElevation>
                                Delete
                            </Button>
                            <Button onClick={() => { handleUpdate(val._id) }} size='small' variant='contained' color='primary' disableElevation>
                                Update
                            </Button>
                        </Box>
                    </Box>
                })
            }
        </Box></> : <Navigate to="/" />}</>;
}

export default AdminProducts;
