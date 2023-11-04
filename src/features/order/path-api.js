import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiOrder } from "../../api/api-order";
import { message } from "antd";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (params, thunkAPI) => {
        try {
            const response = await apiOrder.getOrder(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch orders: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchOrder = createAsyncThunk(
    "order/fetchOrder",
    async (id, thunkAPI) => {
        try {
            const response = await apiOrder.getOrderById(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createOrder = createAsyncThunk(
    "order/createOrder",
    async (params, thunkAPI) => {
        try {
            const response = await apiOrder.createOrder(params);
            message.success("Thêm danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateOrder = createAsyncThunk(
    "order/updateOrder",
    async (params, thunkAPI) => {
        try {
            const response = await apiOrder.updateOrder(params);
            message.success("Cập nhật danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật danh mục thất bại: ${error.msg}`);
            console.log("Failed to update order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    "order/deleteOrder",
    async (id, thunkAPI) => {
        try {
            const response = await apiOrder.deleteOrder(id);
            message.success("Xóa danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);