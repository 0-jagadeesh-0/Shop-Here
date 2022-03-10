import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import './style.scss';
import { Alert, Badge, Button, IconButton, Link, Paper, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { getusercart } from '../../api/cart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import logo from '../../Assets/logo.png';
import { CartContext } from '../../pages/Cart/cartContext';


function Navbar() {

    const { cartItems, updateCart } = useContext(CartContext);

    // const item = useContext(CartContext);
    // console.log(item);

    // const [quantity, setQuantity] = useState(0);


    useEffect(() => {
        if (localStorage.getItem("token")) {
            getusercart().then((res) => {
                updateCart(res.data);
            })
        }

    }, [updateCart])


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
            updateCart([]);
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
                    <Badge badgeContent={cartItems.length} color='secondary'>
                        <ShoppingCartIcon color="primary" />
                    </Badge>
                </IconButton>
            }
            {
                localStorage.getItem("token") ? <IconButton onClick={() => { navigate('/profile') }} className='cart-badge'>

                    <AccountCircleIcon color="primary" />

                </IconButton> : null
            }



            <Button onClick={handleClick} className='login-btn' size="small" variant='contained' disableElevation>
                {type}
            </Button>
        </Box>
    </Paper>;
}

export default Navbar;
