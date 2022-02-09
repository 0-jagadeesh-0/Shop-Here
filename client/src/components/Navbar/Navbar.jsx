import React, { useState } from 'react';
import Box from '@mui/material/Box';
import './style.scss';
import { Alert, Badge, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
// import logo from '../../Assets/logo.png';


function Navbar() {

    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();
    let type;


    if (localStorage.getItem("token")) {
        type = "LOGOUT"
    }
    else if (window.location.pathname === "/" || window.location.pathname === "/register") {
        type = "LOGIN";
    }
    else if (window.location.pathname === "/login") {
        type = "SIGNUP";
    }
    else {
        type = "SIGNUP"
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (type === "LOGIN") {
            navigate('/login');
        }
        if (type === "SIGNUP") {
            navigate('/register');
        }
        if (type === "LOGOUT") {
            localStorage.clear();
            navigate("/");
        }
    }

    const handleCartClick = (e) => {
        e.preventDefault();
        if (localStorage.getItem("token")) {
            navigate("/cart");
        }
        else {
            setPopup(true);

        }

    }



    return <Paper className='navbar'>

        <Typography className='logo' variant='h5'>
            <Link href={localStorage.getItem("isAdmin") === "true" ? "/dashboard" : "/"} style={{ textDecoration: "none", color: "black" }} >SHOP HERE </Link>
        </Typography>

        {
            window.location.pathname === "/" || window.location.pathname === "/products" ? <Box className='search'>
                <SearchBar />
            </Box> : null
        }


        <Box className='login'>
            {
                popup ? <Alert variant='filled' severity='info' >Please Login to Continue.</Alert> : null
            }
            {
                localStorage.getItem("isAdmin") === "true" ? null : <IconButton onClick={handleCartClick} className='cart-badge'>
                    <Badge badgeContent={0} color='secondary'>
                        <ShoppingCartIcon color="primary" />
                    </Badge>
                </IconButton>
            }



            <Button onClick={handleClick} className='login-btn' size="small" variant='contained' disableElevation>
                {type}
            </Button>
        </Box>
    </Paper>;
}

export default Navbar;
