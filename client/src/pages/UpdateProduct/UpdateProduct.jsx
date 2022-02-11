import { Box, TextField } from '@mui/material'
import React from 'react'

function UpdateProduct() {
    return (
        <Box>
            <TextField
                label="Title"
                defaultValue="Puma"
                variant='standard'
            />
            <TextField
                label="Description"
                defaultValue="Puma"
                variant='standard'
            />
            <TextField
                label="Color"
                defaultValue="Puma"
                variant='standard'
            />
        </Box>
    )
}

export default UpdateProduct;