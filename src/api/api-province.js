import axios from 'axios';


const domain = "https://provinces.open-api.vn"

export const ApiProvince = {
    getAllProvince: () => {
        const url = `${domain}/api/?depth=3`;
        return axios.get(url);
    }
}