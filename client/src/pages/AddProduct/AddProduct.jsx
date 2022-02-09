import { Avatar, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { addproduct } from '../../api/products';
import { upload } from '../../api/upload';
import './style.scss'
import AddIcon from '@mui/icons-material/Add';

function AddProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    // const [category, setCategory] = useState([]);
    // const [fileInput, setFileInput] = useState("");
    const [previewSource, setPreviewSource] = useState("");
    const [image, setImage] = useState("");

    const userId = localStorage.getItem("userId");


    const handleClick = async (e) => {
        e.preventDefault();
        if (!previewSource) return;
        await upload({ data: previewSource }).then((res) => {
            setImage(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
        addproduct({ title, description, price, size, color, image, userId }).then((res) => {
            console.log(res.data);
        }).catch((res) => {
            console.log(res);
        })

    }



    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        // setFileInput(file);
        preViewFile(file);
        console.log(previewSource);
    }

    const preViewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    return <Box className='add-product-container'>
        <Box className='product-info'>
            <Avatar style={{ backgroundColor: "#2196f3", margin: "1% 0" }}  >
                <AddIcon />
            </Avatar>
            <Box className='info'>

                <TextField
                    className='text-field'
                    size='small'
                    label="Title"
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <TextField
                    className='text-field'
                    size='small'
                    label="Description"
                    onChange={(e) => { setDescription(e.target.value) }}
                />
                <TextField
                    className='text-field'
                    size='small'
                    label="price"
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <TextField
                    className='text-field'
                    size='small'
                    label="Size"
                    onChange={(e) => { setSize(e.target.value) }}
                />
                <TextField
                    className='text-field'
                    size='small'
                    label="Color"
                    onChange={(e) => { setColor(e.target.value) }}
                />

                <input

                    onChange={handleFileInputChange}
                    style={{ margin: "5% 0", border: "none", cursor: "pointer" }}
                    type='file'

                />
                {
                    previewSource && (
                        <img style={{ width: "300px", height: "300px" }} src={previewSource} alt="" />
                    )
                }



                <Button onClick={handleClick} variant="contained" color="primary" disableElevation>
                    ADD PRODUCT
                </Button>
            </Box>


        </Box>
    </Box>;
}

export default AddProduct;
