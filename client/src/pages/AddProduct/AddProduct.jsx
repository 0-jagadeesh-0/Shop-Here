import { Avatar, Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { addproduct } from '../../api/products';
import './style.scss'
import AddIcon from '@mui/icons-material/Add';

function AddProduct() {

    const initialValues = {
        title: "",
        description: "",
        price: "",
        size: "",
        color: "",
        category: ""
    }
    const [input, setInput] = useState(initialValues);
    const [previewSource, setPreviewSource] = useState("");

    const adminId = localStorage.getItem("userId");




    const handleClick = async (e) => {
        e.preventDefault();
        if (!previewSource) return;
        addproduct({ ...input, category: input.category.split(','), size: input.size.split(','), previewSource, adminId }).then((res) => {
            console.log(res.data);
        }).catch((res) => {
            console.log(res.data);
        })

    }



    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
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
                    name='title'
                    value={input.title}
                    label="Title"
                    onChange={handleInputChange}
                />
                <TextField
                    className='text-field'
                    size='small'
                    name='description'
                    value={input.description}
                    label="Description"
                    onChange={handleInputChange}
                />
                <TextField
                    className='text-field'
                    size='small'
                    name='category'
                    value={input.category}
                    label='Category'
                    onChange={handleInputChange}
                />
                <TextField
                    className='text-field'
                    size='small'
                    name='size'
                    value={input.size}
                    label='Size'
                    onChange={handleInputChange}
                />
                <TextField
                    className='text-field'
                    size='small'
                    name='price'
                    value={input.price}
                    label="price"
                    onChange={handleInputChange}
                />

                <TextField
                    className='text-field'
                    size='small'
                    name='color'
                    value={input.color}
                    label="Color"
                    onChange={handleInputChange}
                />

                <input

                    onChange={handleFileInputChange}
                    style={{ margin: "5% 0", border: "none", cursor: "pointer" }}
                    type='file'
                    accept="image/*"

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
