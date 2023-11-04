import { createSlice } from "@reduxjs/toolkit";
import {
    fetchRateds,
    fetchRated,
    fetchRatedByProductId,
    createRated,
    updateRated,
    deleteRated,
} from "./path-api";

export const ratedSlice = createSlice({
    name: "rated",
    initialState: {
        rateds: [],
        rated: null,
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchRateds.pending]: (state) => {
            state.loading = true;
        },
        [fetchRateds.fulfilled]: (state, action) => {
            state.loading = false;
            state.rateds = action.payload.rated;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchRateds.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchRated.pending]: (state) => {
            state.loading = true;
        },
        [fetchRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.rated = action.payload.data;
        },
        [fetchRated.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchRatedByProductId.pending]: (state) => {
            state.loading = true;
        },
        [fetchRatedByProductId.fulfilled]: (state, action) => {
            state.loading = false;
            state.rateds = action.payload.rateds;
        },
        [fetchRatedByProductId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createRated.pending]: (state) => {
            state.loading = true;
        },
        [createRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.rateds.unshift(action.payload.data);
        },
        [createRated.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateRated.pending]: (state) => {
            state.loading = true;
        },
        [updateRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.rated = action.payload.data;
        },
        [updateRated.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteRated.pending]: (state) => {
            state.loading = true;
        },
        [deleteRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.rateds = state.rateds.filter(
                (rated) => rated._id !== action.meta.arg
            );
        },
        [deleteRated.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default ratedSlice.reducer;