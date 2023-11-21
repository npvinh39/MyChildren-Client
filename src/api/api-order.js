import { axiosClient } from "./client-axios";

export const apiOrder = {
    getOrder: async (params) => {
        const url = `/order?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        const response = await axiosClient.get(url);
        return response;
    },

    getOrderById: async (id) => {
        const url = `/order/${id}`;
        const response = await axiosClient.get(url);
        return response;
    },

    getOrderByCode: async (code) => {
        const url = `/order/code/${code}`;
        const response = await axiosClient.get(url);
        return response;
    },

    getOrderByUser: async (user) => {
        const url = `/order/user/${user}`;
        const response = await axiosClient.get(url);
        return response;
    },

    createOrder: async (params) => {
        const url = `/order/add/${params.id}`;
        console.log("params", params);
        const response = await axiosClient.post(url, params);
        return response;
    },

    updateOrder: async (params) => {
        console.log(params)
        const url = `/order/edit/${params.id}`;
        const response = await axiosClient.patch(url, params);
        return response;
    },

    deleteOrder: async (id) => {
        const url = `/order/delete/${id}`;
        const response = await axiosClient.delete(url);
        return response;
    },
};