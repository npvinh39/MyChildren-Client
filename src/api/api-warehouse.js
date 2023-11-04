import { axiosClient } from "./client-axios";

export const apiWarehouses = {
    getAll: (params) => {
        const url = `/warehouses?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        return axiosClient.get(url, params);
    },

    in: (params) => {
        const url = `/warehouses/in`;
        return axiosClient.post(url, params);
    },

    out: (params) => {
        const url = `/warehouses/out`;
        return axiosClient.post(url, params);
    },
};