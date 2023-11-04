import { axiosClient } from "./client-axios";

export const apiRevenue = {
    getAll: (params) => {
        const url = `/revenue`;
        return axiosClient.get(url, params);
    },
};