import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRevenue } from "../../api/api-revenue";
import { message } from "antd";

export const fetchRevenues = createAsyncThunk(
    "revenue/fetchRevenues",
    async (params, thunkAPI) => {
        try {
            const response = await apiRevenue.getAll(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch revenues: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);
