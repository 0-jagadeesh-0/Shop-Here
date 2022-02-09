import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getproduct, updateadminproduct } from '../../api/products';
import { Image } from 'cloudinary-react';
import './style.scss';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

function AdminProduct() {


    const [product, setProduct] = useState({ title: "Title", description: "Desc", color: "red", image: null, size: "9" });
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewDescription, setPreviewDescription] = useState("");
    const [previewColor, setpreviewColor] = useState("");
    const [previewSize, setpreviewSize] = useState("");
    const [previewImage, setpreviewImage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);

    const productId = window.location.pathname.split("/")[1];




    getproduct(productId).then((res) => {
        setProduct(res.data);
        setPreviewTitle(product.title);
        setPreviewDescription(product.description);
        setpreviewColor(product.color);
        setpreviewSize(product.size);
        setpreviewImage(product.image);

    })






    const handleUpdate = (e) => {
        e.preventDefault();
        setOpen(true);
    }
    const handleClose = (e) => {
        e.preventDefault();
        setOpen(false);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        await updateadminproduct({ title, description, color, size, productId }).then((res) => {
            console.log(res);
        })
        setOpen(false);

    }


    return <>{localStorage.getItem("isAdmin") === "true" ? <>
        <Navbar />
        <Box className='admin-product'>
            <Box className='product-details'>
                <TextField
                    className='field'
                    label="Title"
                    value={previewTitle}
                    disabled

                />
                <TextField
                    className='field'
                    label="Description"
                    value={previewDescription}
                    disabled
                />
                <TextField
                    className='field'
                    label="Color"
                    value={previewColor}
                    disabled
                />
                <TextField
                    className='field'
                    label="Size"
                    value={previewSize}
                    disabled
                />
                <Image
                    className='field'
                    cloudName={process.env.REACT_APP_CLOUDINARY_USER_NAME}
                    publicId={previewImage}
                    width="230px"
                    height="230px"
                />
                <Button onClick={handleUpdate} className='field' variant='contained' color='primary' disableElevation>
                    Update Product
                </Button>
            </Box>
            <Dialog open={open} >
                <DialogTitle>
                    Update Product
                </DialogTitle>
                <DialogContent>
                    <TextField
                        variant='standard'
                        label="Title"
                        fullWidth
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        label="Description"
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        label="Color"
                        fullWidth
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <TextField
                        variant='standard'
                        label="Size"
                        fullWidth
                        onChange={(e) => setSize(e.target.value)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleClose} disableElevation>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClick} disableElevation>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>

        </Box></> : <Navigate to="/" />}</>;
}

export default AdminProduct;
