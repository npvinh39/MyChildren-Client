import { createSlice } from "@reduxjs/toolkit";
import { fetchRevenues } from "./path-api";

export const revenueSlice = createSlice({
    name: "revenue",
    initialState: {
        revenues: [],
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchRevenues.pending]: (state) => {
            state.loading = true;
        },
        [fetchRevenues.fulfilled]: (state, action) => {
            state.loading = false;
            state.revenues = action.payload.revenue;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchRevenues.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default revenueSlice.reducer;