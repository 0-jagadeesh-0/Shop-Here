import axios from 'axios';
import { BASE_URL } from '../constants/constants';


export const getusercart = async () => {
    return await axios.get(`${BASE_URL}/api/cart/${localStorage.getItem("userId")}`, { headers: { "token": localStorage.getItem("token") } });
}

export const addcartitem = async (payload) => {
    return await axios.post(`${BASE_URL}/api/cart/add/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const deleteitem = async (payload) => {
    return await axios.post(`${BASE_URL}/api/cart/delete/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const clearcart = async () => {
    return await axios.delete(`${BASE_URL}/api/cart/clear/${localStorage.getItem("userId")}`, { headers: { "token": localStorage.getItem("token") } });
}

export const updatecart = async (payload) => {
    return await axios.put(`${BASE_URL}/api/cart/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } })
}

