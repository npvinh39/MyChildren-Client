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

export const fetchOrderByCode = createAsyncThunk(
    "order/fetchOrderByCode",
    async (code, thunkAPI) => {
        try {
            const response = await apiOrder.getOrderByCode(code);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchOrderByUser = createAsyncThunk(
    "order/fetchOrderByUser",
    async (id, thunkAPI) => {
        try {
            const response = await apiOrder.getOrderByUser(id);
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
            message.success("Đặt hàng thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const cancelOrder = createAsyncThunk(
    "order/cancelOrder",
    async (params, thunkAPI) => {
        try {
            const response = await apiOrder.cancelOrder(params);
            message.success("Hủy đơn hàng thành công");
            return response;
        } catch (error) {
            message.error(`Hủy đơn hàng thất bại: ${error.msg}`);
            console.log("Failed to cancel order: ", error);
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