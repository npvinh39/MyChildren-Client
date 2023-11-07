import { axiosClient } from "./client-axios";

export const apiRated = {
    getAll: (params) => {
        const url = `/rated`;
        return axiosClient.get(url, params);
    },

    get: (id) => {
        const url = `/rated/${id}`;
        return axiosClient.get(url);
    },

    getByUserId: (id) => {
        const url = `/rated/user/${id}`;
        return axiosClient.get(url);
    },


    getByProductId: (params) => {
        const url = `/rated/product/${params.id}?page=${params.currentPage}&limit=${params.pageSize}&sort=${params.sort}`;
        return axiosClient.get(url);
    },

    getTotalRating: (id) => {
        const url = `/rated/total-rating/${id}`;
        return axiosClient.get(url);
    },

    create: (params) => {
        const url = `/rated/add`;
        return axiosClient.post(url, params);
    },

    update: (params) => {
        const url = `/rated/edit/${params.id}`;
        return axiosClient.patch(url, params);
    },

    delete: (id) => {
        const url = `/rated/delete/${id}`;
        return axiosClient.delete(url);
    },
};