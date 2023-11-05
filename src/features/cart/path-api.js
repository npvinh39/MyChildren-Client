import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCart } from "../../api/api-cart"
import { message } from "antd";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (params, thunkAPI) => {
        try {
            const response = await apiCart.getCart();
            return response;
        } catch (error) {
            message.error(`Lấy giỏ hàng thất bại: ${error.msg}`);
            console.log("Failed to fetch cart: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (params, thunkAPI) => {
        try {
            const response = await apiCart.addToCart(params);
            message.success("Thêm vào giỏ hàng thành công");
            return response;
        } catch (error) {
            message.error(`Thêm vào giỏ hàng thất bại: ${error.msg}`);
            console.log("Failed to add to cart: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProductFromCart = createAsyncThunk(
    "cart/updateProductFromCart",
    async (params, thunkAPI) => {
        try {
            const response = await apiCart.updateProductFromCart(params);
            message.success("Cập nhật giỏ hàng thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật giỏ hàng thất bại: ${error.msg}`);
            console.log("Failed to update cart: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteProductFromCart = createAsyncThunk(
    "cart/deleteProductFromCart",
    async (params, thunkAPI) => {
        try {
            const response = await apiCart.deleteProductFromCart(params);
            message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
            return response;
        } catch (error) {
            message.error(`Xóa sản phẩm khỏi giỏ hàng thất bại: ${error.msg}`);
            console.log("Failed to delete product from cart: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteAllProductFromCart = createAsyncThunk(
    "cart/deleteAllProductFromCart",
    async (params, thunkAPI) => {
        try {
            const response = await apiCart.deleteAllProductFromCart();
            message.success("Xóa tất cả sản phẩm khỏi giỏ hàng thành công");
            return response;
        } catch (error) {
            message.error(`Xóa tất cả sản phẩm khỏi giỏ hàng thất bại: ${error.msg}`);
            console.log("Failed to delete all product from cart: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);