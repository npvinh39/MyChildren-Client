import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCategory } from "../../api/api-category";
import { message } from "antd";

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (params, thunkAPI) => {
        try {
            const response = await apiCategory.getAll(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch categories: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchCategoriesForProduct = createAsyncThunk(
    "category/fetchCategoriesForProduct",
    async (params, thunkAPI) => {
        try {
            const response = await apiCategory.getAllForProduct(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch categories: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async (id, thunkAPI) => {
        try {
            const response = await apiCategory.get(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch category: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (params, thunkAPI) => {
        try {
            const response = await apiCategory.create(params);
            message.success("Thêm danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Thêm danh mục thất bại: ${error.msg}`);
            console.log("Failed to create category: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (params, thunkAPI) => {
        try {
            const response = await apiCategory.update(params);
            message.success("Cập nhật danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật danh mục thất bại: ${error.msg}`);
            console.log("Failed to update category: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, thunkAPI) => {
        try {
            const response = await apiCategory.delete(id);
            message.success("Xóa danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete category: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);