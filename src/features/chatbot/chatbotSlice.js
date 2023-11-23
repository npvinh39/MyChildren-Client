import { createSlice } from "@reduxjs/toolkit";
import { fetchStatusChatbot, sendMessage } from "./path-api";

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState: {
        messages: [],
        status: null,
        loading: false,
        message: "",
    },
    reducers: {},
    extraReducers: {
        [fetchStatusChatbot.pending]: (state) => {
            state.loading = true;
        },
        [fetchStatusChatbot.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = action.payload.status;
        },
        [fetchStatusChatbot.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [sendMessage.pending]: (state) => {
            state.loading = true;
        },
        [sendMessage.fulfilled]: (state, action) => {
            state.loading = false;
            const message = {
                message: action.meta.arg.message,
                sender: action.meta.arg.sender,
                recipient_id: action.payload.data[0].recipient_id,
                text: action.payload.data[0].text,
            };
            state.messages = [...state.messages, message];
        },
        [sendMessage.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default chatbotSlice.reducer;