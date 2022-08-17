import axios from "axios";

/* Creating an axios instance with a baseURL of /api. */
export const api = axios.create({
    baseURL: '/api'
})