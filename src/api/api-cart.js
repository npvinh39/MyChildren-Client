import { axiosClient } from "./client-axios";

export const apiCart = {
    getCart: () => {
        const url = `/cart`;
        return axiosClient.get(url);
    },
    addToCart: (data) => {
        const url = `/cart/add`;
        return axiosClient.post(url, data);
    },
    updateProductFromCart: (data) => {
        const url = `/cart/update`;
        return axiosClient.patch(url, data);
    },
    deleteProductFromCart: (data) => {
        const url = `/cart/delete/${data.id}`;
        return axiosClient.patch(url, data);
    },
    deleteAllProductFromCart: () => {
        const url = `/cart/delete-all`;
        return axiosClient.patch(url);
    },
}