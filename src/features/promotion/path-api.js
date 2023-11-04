import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiPromotion } from "../../api/api-promotion";
import { message } from "antd";

export const fetchPromotions = createAsyncThunk(
    "promotion/fetchPromotions",
    async (params, thunkAPI) => {
        try {
            const response = await apiPromotion.getPromotion(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch promotions: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchPromotion = createAsyncThunk(
    "promotion/fetchPromotion",
    async (id, thunkAPI) => {
        try {
            const response = await apiPromotion.getPromotionById(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch promotion: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createPromotion = createAsyncThunk(
    "promotion/createPromotion",
    async (params, thunkAPI) => {
        try {
            const response = await apiPromotion.createPromotion(params);
            message.success("Thêm danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create promotion: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updatePromotion = createAsyncThunk(
    "promotion/updatePromotion",
    async (params, thunkAPI) => {
        try {
            const response = await apiPromotion.updatePromotion(params);
            message.success("Cập nhật danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật danh mục thất bại: ${error.msg}`);
            console.log("Failed to update promotion: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deletePromotion = createAsyncThunk(
    "promotion/deletePromotion",
    async (id, thunkAPI) => {
        try {
            const response = await apiPromotion.deletePromotion(id);
            message.success("Xóa danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete promotion: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);