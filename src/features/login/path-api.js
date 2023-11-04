import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { apiUser } from "../../api";
import { message } from "antd";

export const onLogin = createAsyncThunk(
    "login/onLogin",
    async (params, thunkAPI) => {
        try {
            const { accessToken, refreshToken } = await apiUser.login(params);
            if (accessToken && refreshToken) {
                Cookies.set("accessToken", accessToken);
                Cookies.set("refreshToken", refreshToken);
            }
            message.success("Đăng nhập thành công");
            return { accessToken, refreshToken };
        } catch (error) {
            message.error(`Đăng nhập thất bại: ${error.msg}`);
            console.log("Failed to fetch login: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const onRegister = createAsyncThunk(
    "login/onRegister",
    async (params, thunkAPI) => {
        try {
            const { accessToken, refreshToken } = await apiUser.register(params);
            if (accessToken && refreshToken) {
                Cookies.set("accessToken", accessToken);
                Cookies.set("refreshToken", refreshToken);
            }
            message.success("Đăng ký thành công");
            return { accessToken, refreshToken };
        } catch (error) {
            message.error(`Đăng ký thất bại: ${error.msg}`);
            console.log("Failed to fetch register: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const onLogout = createAsyncThunk(
    "login/onLogout",
    async (params, thunkAPI) => {
        try {
            await apiUser.logout(params);
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            message.success("Đăng xuất thành công");
            return { msg: "Đăng xuất thành công" };
        } catch (error) {
            message.error(`Đăng xuất thất bại: ${error.msg}`);
            console.log("Failed to fetch logout: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);