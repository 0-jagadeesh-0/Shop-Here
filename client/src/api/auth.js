import axios from 'axios';
import { BASE_URL } from '../constants/constants';



export const signup = async (payload) => {
    return await axios.post(`${BASE_URL}/api/auth/register`, payload);
}

export const login = async (payload) => {
    return await axios.post(`${BASE_URL}/api/auth/login`, payload);
}