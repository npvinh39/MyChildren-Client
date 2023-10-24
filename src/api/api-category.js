import { axiosClient } from "./client-axios";

// const domain = "http://localhost:5000";
const domain = "https://my-children-server.vercel.app";


export const ApiCategory = {
    getAll: () => {
        const url = `${domain}/api/categories`;
        return axiosClient.get(url);
    }
};
