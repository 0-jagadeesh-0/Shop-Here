import { Box, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteproduct, getadminproducts, updateadminproduct } from '../../api/products';
import './style.scss'
import { Image } from 'cloudinary-react';
import Navbar from '../../components/Navbar/Navbar';
import { deleteimage, upload } from '../../api/upload';

function AdminProducts() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [preview, setPreview] = useState("");
    const [image, setImage] = useState("");




    useEffect(() => {
        getadminproducts(localStorage.getItem("userId")).then((res) => {
            setProducts(res.data);
        })
    }, [products]);

    const handleDelete = (productId, publicId) => {
        deleteproduct(productId).then((res) => {
            console.log(res);
        })
        deleteimage({ publicId }).then((res) => {
            console.log(res);
        })

    }

    const handleUpdate = () => {
        setOpen(true);
    }

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
            console.log(preview);
        }
    }

    const handleClick = async (productId) => {

        if (!preview) return;
        await upload({ data: preview }).then((res) => {
            setImage(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })

        updateadminproduct({ title, description, color, image, size, productId }).then((res) => {
            console.log(res);
        })
        setOpen(false);

    }


    return <>{localStorage.getItem("isAdmin") === "true" ? <>
        <Navbar />
        <Box className='admin-products-container'>
            {
                products.map((val) => {

                    return <Paper elevation={3} className='admin-product' key={val._id}>
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
                            <Button className='btn' onClick={() => { handleDelete(val._id, val.image) }} size='small' variant='contained' style={{ backgroundColor: "red" }} disableElevation>
                                Delete
                            </Button>
                            <Button className='btn' onClick={() => { handleUpdate(val._id) }} size='small' variant='contained' color='primary' disableElevation>
                                Update
                            </Button>
                        </Box>
                        <Dialog open={open}>
                            <DialogTitle>
                                Update Product
                            </DialogTitle>
                            <DialogContent>
                                <TextField
                                    label="Title"
                                    defaultValue={val.title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    variant="standard" />
                                <TextField
                                    label="Description"
                                    defaultValue={val.description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    variant="standard" />
                                <TextField
                                    label="Color"
                                    defaultValue={val.color}
                                    onChange={(e) => { setColor(e.target.value) }}
                                    variant="standard" />
                                <TextField
                                    label="Size"
                                    defaultValue={val.size}
                                    onChange={(e) => { setSize(e.target.value) }}
                                    variant="standard" />
                                <TextField
                                    type="file"
                                    onChange={handleFileInput}
                                    label="Upload"
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant='contained' style={{ backgroundColor: "red" }} size="small" disableElevation onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant='contained' size="small" disableElevation color='primary' onClick={() => { handleClick(val._id) }}>
                                    Update
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Paper>

                })
            }
        </Box></> : <Navigate to="/" />}</>;
}

export default AdminProducts;
