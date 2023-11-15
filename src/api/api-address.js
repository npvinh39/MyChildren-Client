import { axiosClient } from "./client-axios";

export const apiAddress = {
    getAddress: () => {
        const url = `/address`;
        return axiosClient.get(url);
    },

    getAddressById: (data) => {
        const url = `/address/id/${data.id}`;
        return axiosClient.get(url);
    },

    getAddressByUserId: (data) => {
        const url = `/address/user-address`;
        return axiosClient.get(url);
    },

    addAddress: (data) => {
        const url = `/address/add`;
        return axiosClient.post(url, data);
    },

    updateDefaultAddress: (data) => {
        const url = `/address/default`;
        return axiosClient.patch(url, data);
    },

    updateAddress: (data) => {
        const url = `/address/update/${data.id}`;
        return axiosClient.patch(url, data);
    },
    deleteAddress: (data) => {
        const url = `/address/delete/${data.id}`;
        return axiosClient.patch(url, data);
    },
}