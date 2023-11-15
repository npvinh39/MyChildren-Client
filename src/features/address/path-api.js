import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAddress } from "../../api/api-address"
import { message } from "antd";

export const fetchAddress = createAsyncThunk(
    "address/fetchAddress",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.getAddress();
            return response;
        } catch (error) {
            message.error(`Lấy địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to fetch address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchAddressById = createAsyncThunk(
    "address/fetchAddressById",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.getAddressById(params);
            return response;
        } catch (error) {
            message.error(`Lấy địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to fetch address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchAddressByUserId = createAsyncThunk(
    "address/fetchAddressByUserId",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.getAddressByUserId(params);
            return response;
        } catch (error) {
            message.error(`Lấy địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to fetch address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addAddress = createAsyncThunk(
    "address/addAddress",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.addAddress(params);
            message.success("Thêm địa chỉ thành công");
            return response;
        } catch (error) {
            message.error(`Thêm địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to add address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateDefaultAddress = createAsyncThunk(
    "address/updateDefaultAddress",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.updateDefaultAddress(params);
            message.success("Cập nhật địa chỉ mặc định thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật địa chỉ mặc định thất bại: ${error.msg}`);
            console.log("Failed to update default address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateAddress = createAsyncThunk(
    "address/updateAddress",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.updateAddress(params);
            message.success("Cập nhật địa chỉ thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to update address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async (params, thunkAPI) => {
        try {
            const response = await apiAddress.deleteAddress(params);
            message.success("Xóa địa chỉ thành công");
            return response;
        } catch (error) {
            message.error(`Xóa địa chỉ thất bại: ${error.msg}`);
            console.log("Failed to delete address: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);