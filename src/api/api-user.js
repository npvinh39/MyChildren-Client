import { axiosClient } from "./client-axios";

export const apiUser = {
    login: (params) => {
        const url = `/user/login`;
        return axiosClient.post(url, params);
    },

    register: (params) => {
        const url = `/user/register`;
        return axiosClient.post(url, params);
    },

    refreshToken: (params) => {
        const url = `/user/refresh_token`;
        return axiosClient.get(url, params);
    },

    logout: (params) => {
        const url = `/user/logout`;
        return axiosClient.get(url, params);
    },

    getProfile: (params) => {
        const url = `/user/info`;
        return axiosClient.get(url, params);
    },

    getAllUser: (params) => {
        const url = `/user/all_info?page=${params && params.currentPage}&limit=${params && params.pageSize}`;
        return axiosClient.get(url, params);
    },

    getUserById: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    editUser: (params) => {
        const url = `/user/edit/${params.id}`;
        return axiosClient.patch(url, params);
    },

    deleteUser: (id) => {
        const url = `/user/delete/${id}`;
        return axiosClient.delete(url);
    },

    updateProfile: (params) => {
        const url = `/user/update`;
        return axiosClient.patch(url, params);
    },

    changePassword: (params) => {
        const url = `/user/change_password`;
        return axiosClient.patch(url, params);
    },

    forgotPassword: (params) => {
        const url = `/user/forgot_password`;
        return axiosClient.post(url, params);
    },

    resetPassword: (params) => {
        const url = `/user/reset_password/${params.token}`;
        return axiosClient.post(url, params);
    },
};