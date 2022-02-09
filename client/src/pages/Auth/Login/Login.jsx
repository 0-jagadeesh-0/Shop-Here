import { Box, Button, Link, TextField, Typography, Alert } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/auth';
import Navbar from '../../../components/Navbar/Navbar';
import './style.scss';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        login({ username, password }).then((res) => {
            setError(false);
            let token = res.data.token;
            let userId = res.data.id;
            let isAdmin = res.data.admin;
            localStorage.setItem("userId", userId);
            localStorage.setItem("token", token);
            localStorage.setItem("isAdmin", isAdmin);
            if (localStorage.getItem("isAdmin") === "true") {
                navigate("/dashboard");
            }
            else {
                navigate('/');
            }

        }).catch((res) => {
            setError(true);
        })
    }


    return <Box className='main'>
        <Navbar />

        <Box className='login-form'>
            <Box className='login' >
                {error && <Alert variant='filled' style={{ margin: "10px 0" }} severity="error">Invalid password/username</Alert>}
                <Box>
                    <TextField
                        size='small'
                        sx={{ margin: "10px" }}
                        label="Username"
                        type="text"
                        onChange={(e) => { setUsername(e.target.value) }}
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
                    <Button onClick={handleSubmit} className='login-btn' sx={{ margin: "10px" }} variant="contained" disableElevation>
                        LOGIN
                    </Button>
                </Box>
                <Box>
                    <Typography variant='p'>
                        Don't have an account?
                    </Typography>
                </Box>
                <Link href='/register' >Create an accout By Clicking here.</Link>

            </Box>
        </Box>

    </Box>;
}

export default Login;
