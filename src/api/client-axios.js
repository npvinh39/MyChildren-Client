import axios from "axios";
import Cookies from "js-cookie";
import { apiAdmin } from "./api-admin";


const domain = "http://localhost:5000/api";

export const axiosClient = axios.create({
    baseURL: domain,
    headers: {
        "content-type": "application/json",
    },
    responseType: "json",
});

axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function error() {
        console.log('error 1', error)
        return Promise.reject(error);
    }
);



let refreshTokenRequest = null;
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        const { data, status } = error.response;
        if (status === 400) {
            const refresh_Token = Cookies.get('refreshToken')
            refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : handleTokenExpired(refresh_Token);
            const result = refreshTokenRequest;
            result
                .then(({ accessToken }) => {
                    Cookies.set('accessToken', accessToken)
                    window.location.reload();
                })
                .catch((e) => {
                    Cookies.remove('accessToken');
                    Cookies.remove('refreshToken');
                    window.location.reload();
                    console.log(e);
                });
        }
        else {
            throw data;
        }
    }
);

const handleTokenExpired = (refresh_token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await apiAdmin.refreshToken({ refreshToken: refresh_token })
            resolve(result);
        } catch (error) {
            reject(error)
        }
    });
};
