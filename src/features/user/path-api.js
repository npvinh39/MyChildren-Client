import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../api/api-user";
import { message } from "antd";

export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.getAllUser(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch users: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (id, thunkAPI) => {
        try {
            const response = await apiUser.getUserById(id);
            return response;
        } catch (error) {
            message.error(`Lấy danh mục thất bại: ${error.msg}`);
            console.log("Failed to fetch user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.getProfile(params);
            return response;
        } catch (error) {
            message.error(`Lấy thông tin thất bại: ${error.msg}`);
            console.log("Failed to fetch profile: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createUser = createAsyncThunk(
    "user/createUser",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.register(params);
            message.success("Tạo tài khoản thành công");
            return response;
        } catch (error) {
            message.error(`Tạo tài khoản thất bại: ${error.msg}`);
            console.log("Failed to create user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.updateProfile(params);
            message.success("Cập nhật thông tin thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật thông tin thất bại: ${error.msg}`);
            console.log("Failed to update profile: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.changePassword(params);
            message.success("Đổi mật khẩu thành công");
            return response;
        } catch (error) {
            message.error(`Đổi mật khẩu thất bại: ${error.msg}`);
            console.log("Failed to change password: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.forgotPassword(params);
            message.success("Đã gửi email đến hộp thư của bạn");
            return response;
        } catch (error) {
            message.error(`Gửi email thất bại: ${error.msg}`);
            console.log("Failed to send email: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.resetPassword(params);
            message.success("Đổi mật khẩu thành công");
            return response;
        } catch (error) {
            message.error(`Đổi mật khẩu thất bại: ${error.msg}`);
            console.log("Failed to reset password: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (params, thunkAPI) => {
        try {
            const response = await apiUser.editUser(params);
            message.success("Cập nhật danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Cập nhật danh mục thất bại: ${error.msg}`);
            console.log("Failed to update user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id, thunkAPI) => {
        try {
            const response = await apiUser.deleteUser(id);
            message.success("Xóa danh mục thành công");
            return response;
        } catch (error) {
            message.error(`Xóa danh mục thất bại: ${error.msg}`);
            console.log("Failed to delete user: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);