import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiWarehouses } from "../../api/api-warehouse";
import { message } from "antd";

export const fetchWarehouses = createAsyncThunk(
    "warehouse/fetchWarehouses",
    async (params, thunkAPI) => {
        try {
            const response = await apiWarehouses.getAll(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch warehouses: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const inWarehouse = createAsyncThunk(
    "warehouse/inWarehouse",
    async (params, thunkAPI) => {
        try {
            const response = await apiWarehouses.in(params);
            message.success("Thêm kho thành công");
            return response;
        } catch (error) {
            message.error(`Thêm kho thất bại: ${error.msg}`);
            console.log("Failed to create warehouse: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const outWarehouse = createAsyncThunk(
    "warehouse/outWarehouse",
    async (params, thunkAPI) => {
        try {
            const response = await apiWarehouses.out(params);
            message.success("Thêm kho thành công");
            return response;
        } catch (error) {
            message.error(`Thêm kho thất bại: ${error.error}`);
            console.log("Failed to create warehouse: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);