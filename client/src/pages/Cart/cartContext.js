import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartLength, setcartLength] = useState(0);
    const [total, setTotal] = useState(0);
    const updateCart = (data) => {
        setCartItems(data.cartItems);
        setTotal(data.total);
        setcartLength(cartItems.length);
    }

    return <CartContext.Provider value={{ cartLength, total, cartItems, updateCart }}>
        {props.children}
    </CartContext.Provider>
}