import axios from 'axios';
import { BASE_URL } from '../constants/constants';


export const getuserorders = async () => {
    return await axios.get(`${BASE_URL}/api/order/${localStorage.getItem("userId")}`, { headers: { "token": localStorage.getItem("token") } });
}

export const addorder = async (payload) => {
    return await axios.post(`${BASE_URL}/api/order/add/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const deleteorder = async (id) => {
    return await axios.delete(`${BASE_URL}/api/order/${id}`, { headers: { "token": localStorage.getItem("token") } });
}

export const updateorder = async (payload) => {
    return await axios.put(`${BASE_URL}/api/order/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } })
}
