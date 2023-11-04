import { axiosClient } from "./client-axios";

export const apiContacts = {
    getAll: (params) => {
        const url = `/contacts?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        return axiosClient.get(url, params);
    },

    get: (params) => {
        const url = `/contacts/${params.id}`;
        return axiosClient.get(url, params);
    },

    create: (params) => {
        const url = `/contacts`;
        return axiosClient.post(url, params);
    },

    update: (params) => {
        const url = `/contacts/${params.id}`;
        return axiosClient.patch(url, params);
    },

    delete: (params) => {
        const url = `/contacts/${params.id}`;
        return axiosClient.delete(url, params);
    },
};