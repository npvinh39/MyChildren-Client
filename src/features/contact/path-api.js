import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiContacts } from "../../api/api-contact";
import { message } from "antd";

export const fetchContacts = createAsyncThunk(
    "contact/fetchContacts",
    async (params, thunkAPI) => {
        try {
            const response = await apiContacts.getAll(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch contacts: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchContact = createAsyncThunk(
    "contact/fetchContact",
    async (params, thunkAPI) => {
        try {
            const response = await apiContacts.get(params);
            return response;
        } catch (error) {
            message.error(`Lấy danh sách thất bại: ${error.msg}`);
            console.log("Failed to fetch contact: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createContact = createAsyncThunk(
    "contact/createContact",
    async (params, thunkAPI) => {
        try {
            const response = await apiContacts.create(params);
            message.success("Gửi thông tin thành công!");
            return response;
        } catch (error) {
            message.error(`Tạo mới thất bại: ${error.msg}`);
            console.log("Failed to create contact: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateContact = createAsyncThunk(
    "contact/updateContact",
    async (params, thunkAPI) => {
        try {
            const response = await apiContacts.update(params);
            message.success("Cập nhật thành công!");
            return response;
        } catch (error) {
            message.error(`Cập nhật thất bại: ${error.msg}`);
            console.log("Failed to update contact: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contact/deleteContact",
    async (params, thunkAPI) => {
        try {
            const response = await apiContacts.delete(params);
            message.success("Xóa thành công!");
            return response;
        } catch (error) {
            message.error(`Xóa thất bại: ${error.msg}`);
            console.log("Failed to delete contact: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);