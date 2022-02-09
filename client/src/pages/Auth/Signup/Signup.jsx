import { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import Navbar from '../../../components/Navbar/Navbar';
import './style.scss';
import { signup } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';


function Signup() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ firstName, lastName, email, username, password }).then((res) => {
            navigate("/login");
        })
    }

    return <Box className='main'>
        <Navbar />
        <Box className='signup-form'>
            <Box className='signup' >
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="First Name"
                        onChange={(e) => { setFirstName(e.target.value) }}
                    />
                </Box>
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="Last Name"
                        onChange={(e) => { setLastName(e.target.value) }}
                    />
                </Box>
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="Username"
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                </Box>
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </Box>
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="Password"
                        type="password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </Box>
                <Box >
                    <Button onClick={handleSubmit} className='signup-btn' sx={{ margin: "10px" }} variant="contained" disableElevation>
                        SIGNUP
                    </Button>
                </Box>
                <Box>
                    <Typography variant='p'>
                        Already have an account?
                    </Typography>
                </Box>
                <Link href='/login' >Click here to login.</Link>

            </Box>
        </Box>

    </Box>;
}

export default Signup;
