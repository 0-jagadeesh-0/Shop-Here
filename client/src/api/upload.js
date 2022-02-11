import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const upload = async (payload) => {
    return await axios.post(`${BASE_URL}/api/image/upload`, payload);
}

export const deleteimage = async (payload) => {
    return await axios.post(`${BASE_URL}/api/image/delete`, payload);
}