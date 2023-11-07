import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRated } from "../../api/api-rated";
import { message } from "antd";

export const fetchRateds = createAsyncThunk(
    "rated/fetchRateds",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.getAll(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch rateds: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchRated = createAsyncThunk(
    "rated/fetchRated",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.get(params);
            return response;
        } catch (error) {
            message.error(`Lấy đánh giá thất bại: ${error.msg}`);
            console.log("Failed to fetch rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchRatedByUserId = createAsyncThunk(
    "rated/fetchRatedByUserId",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.getByUserId(params);
            return response;
        } catch (error) {
            message.error(`Lấy đánh giá thất bại: ${error.msg}`);
            console.log("Failed to fetch rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchTotalRating = createAsyncThunk(
    "rated/fetchTotalRating",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.getTotalRating(params);
            return response;
        } catch (error) {
            message.error(`Lấy đánh giá thất bại: ${error.msg}`);
            console.log("Failed to fetch rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchRatedByProductId = createAsyncThunk(
    "rated/fetchRatedByProductId",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.getByProductId(params);
            return response;
        } catch (error) {
            message.error(`Lấy đánh giá thất bại: ${error.msg}`);
            console.log("Failed to fetch rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createRated = createAsyncThunk(
    "rated/createRated",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.create(params);
            message.success("Thêm đánh giá thành công");
            return response;
        } catch (error) {
            message.error(`Thêm đánh giá thất bại: ${error.msg}`);
            console.log("Failed to create rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateRated = createAsyncThunk(
    "rated/updateRated",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.update(params);
            message.success("Cập nhật đánh giá thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật đánh giá thất bại: ${error.msg}`);
            console.log("Failed to update rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteRated = createAsyncThunk(
    "rated/deleteRated",
    async (params, thunkAPI) => {
        try {
            const response = await apiRated.delete(params);
            message.success("Xóa đánh giá thành công");
            return response;
        } catch (error) {
            message.error(`Xóa đánh giá thất bại: ${error.msg}`);
            console.log("Failed to delete rated: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);