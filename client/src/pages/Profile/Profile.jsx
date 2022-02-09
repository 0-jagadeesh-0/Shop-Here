import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { getuser, updateuser } from '../../api/user';
import Navbar from '../../components/Navbar/Navbar';
import './style.scss'
import { Navigate } from 'react-router-dom';

function Profile() {

    const [previewName, setPreviewName] = useState("");
    const [previewUsername, setPreviewUsername] = useState("");
    const [previewEmail, setPreviewEmail] = useState("");

    const [firstName, setFirstName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);


    getuser().then((res) => {
        setPreviewName(res.data.firstName);
        setPreviewEmail(res.data.email);
        setPreviewUsername(res.data.username);
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
        await updateuser({ firstName, username, email }).then((res) => {
            console.log(res);
        });
        setOpen(false);


    }




    return <>{localStorage.getItem("token") ? <Box className="profile-container">
        <Navbar />
        <Box className='user-info'>
            <TextField
                className="field"
                label="Name"
                value={previewName}
            />
            <TextField
                className="field"
                label="Username"
                value={previewUsername}
            />
            <TextField
                className="field"
                label="email"
                value={previewEmail}
            />
            <Button variant='contained' color="primary" className='field' onClick={handleUpdate} disableElevation >
                Update Profile
            </Button>
            <Dialog open={open}  >
                <DialogTitle>Update Profile.</DialogTitle>
                <DialogContent>
                    <TextField autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />


                </DialogContent>
                <DialogActions >
                    <Button variant='contained' color='primary' onClick={handleClose} disableElevation>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={handleClick} disableElevation>Update</Button>
                </DialogActions>

            </Dialog>


        </Box>

    </Box> : <Navigate to="/" />}
    </>;
}

export default Profile;
