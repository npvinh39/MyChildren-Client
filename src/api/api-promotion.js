import { axiosClient } from "./client-axios";

export const apiPromotion = {
    getPromotion: async (params) => {
        const url = `/promotion?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        const response = await axiosClient.get(url);
        return response;
    },

    getPromotionById: async (id) => {
        const url = `/promotion/${id}`;
        const response = await axiosClient.get(url);
        return response;
    },

    createPromotion: async (params) => {
        const url = `/promotion/`;
        const response = await axiosClient.post(url, params);
        return response;
    },

    updatePromotion: async (params) => {
        console.log(params)
        const url = `/promotion/${params.id}`;
        const response = await axiosClient.patch(url, params);
        return response;
    },

    deletePromotion: async (id) => {
        const url = `/promotion/${id}`;
        const response = await axiosClient.delete(url);
        return response;
    },
};
