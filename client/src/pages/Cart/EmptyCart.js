import React from 'react'
import emptyCart from '../../Assets/empty.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EmptyCart() {
    const navigate = useNavigate();
    return (
        <div style={{ height: `calc(100vh - 70px)`, display: "flex", justifyContent: "center", alignItems: "center" }} >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <img width="400px" height="400px" src={emptyCart} alt="Cart is Empty" />
                <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "2rem" }} >The Cart is Empty.</div>
                <Button style={{ margin: "20px 0" }} onClick={() => navigate('/products')} >
                    Continue Shopping
                </Button>
            </div>
        </div>
    )
}

export default EmptyCart;