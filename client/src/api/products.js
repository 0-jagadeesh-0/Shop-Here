import axios from 'axios';
import { BASE_URL } from '../constants/constants';


export const getallproducts = async (category) => {
    return await axios.get(category ? `${BASE_URL}/api/product/?category=${category}` : `${BASE_URL}/api/product`);
}

export const getproduct = async (id) => {
    return await axios.get(`${BASE_URL}/api/product/${id}`);
}

export const addproduct = async (payload) => {
    return await axios.post(`${BASE_URL}/api/product/add/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const getadminproducts = async (id) => {
    return await axios.get(`${BASE_URL}/api/product/myproducts/${id}`, { headers: { "token": localStorage.getItem("token") } });
}

export const updateadminproduct = async (payload) => {
    return await axios.put(`${BASE_URL}/api/product/${payload.productId}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const deleteproduct = async (id) => {
    return await axios.delete(`${BASE_URL}/api/product/${id}`, { headers: { "token": localStorage.getItem("token") } })
}



