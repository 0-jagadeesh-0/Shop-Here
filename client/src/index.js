import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { CartContext } from './pages/Cart/cartContext';
import { CartContextProvider } from './pages/Cart/cartContext';


ReactDOM.render(
  <CartContextProvider>
    <App />
  </CartContextProvider>


  ,
  document.getElementById('root')
);

