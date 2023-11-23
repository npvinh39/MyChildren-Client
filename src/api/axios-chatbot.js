import axios from "axios";


const domain = "http://localhost:5005"

export const axiosChatbot = axios.create({
    baseURL: domain,
    headers: {
        "content-type": "application/json",
        "Accept": "application/json"
    },
    responseType: "json",
});