import axios from 'axios';
import { BASE_URL } from '../constants/constants';


export const getuser = async () => {
    return await axios.get(`${BASE_URL}/api/user/${localStorage.getItem("userId")}`, { headers: { "token": localStorage.getItem("token") } });
}

export const updateuser = async (payload) => {
    return await axios.put(`${BASE_URL}/api/user/${localStorage.getItem("userId")}`, payload, { headers: { "token": localStorage.getItem("token") } });
}

export const deleteuser = async () => {
    return await axios.delete(`${BASE_URL}/api/user/${localStorage.getItem("userId")}`, { headers: { "token": localStorage.getItem("token") } });
}
