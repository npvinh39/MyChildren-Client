import { axiosClient } from "./client-axios";

export const apiAdmin = {
    login: (params) => {
        const url = `/admin/login`;
        return axiosClient.post(url, params);
    },

    register: (params) => {
        const url = `/admin/register`;
        return axiosClient.post(url, params);
    },

    refreshToken: (params) => {
        const url = `/admin/refresh_token`;
        return axiosClient.get(url, params);
    },

    logout: (params) => {
        const url = `/admin/logout`;
        return axiosClient.get(url, params);
    },

    getProfile: (params) => {
        const url = `/admin/info`;
        return axiosClient.get(url, params);
    },

    getAllAdmin: (params) => {
        const url = `/admin/all`;
        return axiosClient.get(url, params);
    },

    getAdminById: (id) => {
        const url = `/admin/${id}`;
        return axiosClient.get(url);
    },

    editAdmin: (params) => {
        const url = `/admin/edit/${params.id}`;
        return axiosClient.patch(url, params);
    },

    deleteAdmin: (id) => {
        const url = `/admin/delete/${id}`;
        return axiosClient.delete(url);
    },

    updateProfile: (params) => {
        const url = `/admin/update`;
        return axiosClient.patch(url, params);
    },

    changePassword: (params) => {
        const url = `/admin/change_password`;
        return axiosClient.patch(url, params);
    },

    forgotPassword: (params) => {
        const url = `/admin/forgot_password`;
        return axiosClient.post(url, params);
    },

    resetPassword: (params) => {
        const url = `/admin/reset_password`;
        return axiosClient.post(url, params);
    },
};