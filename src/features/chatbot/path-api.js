import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiChatbot } from "../../api/api-chatbot";
import { message } from "antd";


export const fetchStatusChatbot = createAsyncThunk(
    "chatbot/fetchStatus",
    async (params, thunkAPI) => {
        try {
            const response = await apiChatbot.getChatbot();
            return response;
        } catch (error) {
            // message.error(`Lấy trạng thái chatbot thất bại: ${error.msg}`);
            console.log("Failed to fetch status chatbot: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const sendMessage = createAsyncThunk(
    "chatbot/sendMessage",
    async (params, thunkAPI) => {
        try {
            const response = await apiChatbot.postMessage(params);
            return response;
        } catch (error) {
            message.error(`Gửi tin nhắn thất bại: ${error.msg}`);
            console.log("Failed to send message: ", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);