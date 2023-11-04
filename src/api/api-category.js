import { axiosClient } from "./client-axios";

export const apiCategory = {
    getAll: (params) => {
        const url = `/categories?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        return axiosClient.get(url, params);
    },

    getAllForProduct: (params) => {
        const url = `/categories/all`;
        return axiosClient.get(url, params);
    },

    get: (id) => {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },

    create: (params) => {
        const url = `/categories/add`;
        return axiosClient.post(url, params);
    },

    update: (params) => {
        const url = `/categories/update/${params.id}`;
        return axiosClient.patch(url, params);
    },

    delete: (id) => {
        const url = `/categories/delete/${id}`;
        return axiosClient.delete(url);
    },
};
