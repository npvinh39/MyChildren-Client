import { axiosClient } from "./client-axios";

const domain = "http://localhost:5000";
// const domain = "https://vinhnguyen.gcalls.vn";

export const ApiOrder = {
    getAll: () => {
        const url = `${domain}/api/order`;
        return axiosClient.get(url);
    },

    get: (id) => {
        const url = `${domain}/api/order/${id}`;
        return axiosClient.get(url);
    },

    add: (order, id) => {
        const url = `${domain}/api/order/add/${id}`;
        return axiosClient.post(url, order);
    }
};