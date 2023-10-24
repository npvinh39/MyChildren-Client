import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: "",
    headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
});
