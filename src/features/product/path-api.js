import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiProduct } from "../../api";

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (params, thunkAPI) => {
        try {
            const response = await apiProduct.getAll(params);
            return response;
        } catch (error) {
            console.log("Failed to fetch products: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProductsWithDescription = createAsyncThunk(
    "product/fetchProductsWithDescription",
    async (params, thunkAPI) => {
        try {
            const response = await apiProduct.getAllWithDescription(params);
            return response;
        } catch (error) {
            console.log("Failed to fetch products with description: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProduct = createAsyncThunk(
    "product/fetchProduct",
    async (id) => {
        const response = await apiProduct.get(id);
        return response;
    }
);

export const fetchProductPromotion = createAsyncThunk(
    "product/fetchProductPromotion",
    async (id, thunkAPI) => {
        try {
            const response = await apiProduct.get(id);
            return response;
        } catch (error) {
            console.log("Failed to fetch products promotion: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProductOrder = createAsyncThunk(
    "product/fetchProductOrder",
    async (data, thunkAPI) => {
        try {
            const response = await apiProduct.get(data.product_id);
            return { quantity: data.quantity, ...response };
        } catch (error) {
            console.log("Failed to fetch products order: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    "product/fetchProductsByCategory",
    async (id, thunkAPI) => {
        try {
            const response = await apiProduct.getByCategory(id);
            return response;
        } catch (error) {
            console.log("Failed to fetch products by category: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchDescriptionByProductId = createAsyncThunk(
    "product/fetchDescriptionByProductId",
    async (id, thunkAPI) => {
        try {
            const response = await apiProduct.getDescriptionByProductId(id);
            return response;
        } catch (error) {
            console.log("Failed to fetch description by product id: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createProduct = createAsyncThunk(
    "product/createProduct",
    async (params, thunkAPI) => {
        try {
            const response = await apiProduct.create(params);
            return response;
        } catch (error) {
            console.log("Failed to create product: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (params, thunkAPI) => {
        try {
            const response = await apiProduct.update(params);
            return response;
        } catch (error) {
            console.log("Failed to update product: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id, thunkAPI) => {
        try {
            const response = await apiProduct.delete(id);
            return response;
        } catch (error) {
            console.log("Failed to delete product: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);