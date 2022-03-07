import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import SearchBar from './components/SearchBar/SearchBar';
import Profile from './pages/Profile/Profile';
import Product from './components/Product/Product';
import Products from './components/Products/Products';
import AdminDashBoard from './pages/Dashboard/AdminDashBoard/AdminDashBoard';
import AddProduct from './pages/AddProduct/AddProduct';
import AdminProducts from './pages/AdminProducts/AdminProducts';
import AdminProduct from './pages/AdminProduct/AdminProduct';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';
import Cart from './pages/Cart/Cart';
import AdminOrders from './pages/Dashboard/AdminDashBoard/components/AdminOrders/AdminOrders';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category' element={<Products />} />
          <Route path="/dashboard" element={<AdminDashBoard />} />
          <Route path='/add-item' element={<AddProduct />} />
          <Route path='/myproducts' element={<AdminProducts />} />
          <Route path='/:id' element={<AdminProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders/list" element={<AdminOrders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
