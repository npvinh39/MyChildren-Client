import { axiosClient } from "./client-axios";

// const domain = "http://localhost:5000";
const domain = "https://my-children-server.vercel.app";

export const ApiProduct = {
    getAll: () => {
        const url = `${domain}/api/products`;
        return axiosClient.get(url);
    },

    getById: (id) => {
        const url = `${domain}/api/products/${id}`;
        return axiosClient.get(url);
    },

    getByCategory: (id) => {
        const url = `${domain}/api/products/category/${id}`;
        return axiosClient.get(url);
    },
};
