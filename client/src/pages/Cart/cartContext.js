import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const updateCart = (data) => {
        setCartItems(data);
    }

    return <CartContext.Provider value={{ cartItems, updateCart }}>
        {props.children}
    </CartContext.Provider>
}