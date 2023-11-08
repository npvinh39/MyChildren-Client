import { createSlice } from "@reduxjs/toolkit";
import {
    fetchRateds,
    fetchRated,
    fetchRatedByProductId,
    fetchRatedByUserId,
    fetchRatedProductByUserId,
    fetchTotalRating,
    createRated,
    updateRated,
    deleteRated,
} from "./path-api";

export const ratedSlice = createSlice({
    name: "rated",
    initialState: {
        rateds: [],
        ratedByProduct: [],
        ratedProductByUserId: null,
        rated: null,
        totalRating: 0,
        totalStar: 0,
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
            state.ratedByProduct = action.payload.rated;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchRatedByProductId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchRatedByUserId.pending]: (state) => {
            state.loading = true;
        },
        [fetchRatedByUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.rateds = action.payload.rateds;
        },
        [fetchRatedByUserId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchRatedProductByUserId.pending]: (state) => {
            state.loading = true;
        },
        [fetchRatedProductByUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.ratedProductByUserId = action.payload.rated;
        },
        [fetchRatedProductByUserId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchTotalRating.pending]: (state) => {
            state.loading = true;
        },
        [fetchTotalRating.fulfilled]: (state, action) => {
            state.loading = false;
            state.totalRating = action.payload.total;
            state.totalStar = action.payload.rating;
        },
        [fetchTotalRating.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createRated.pending]: (state) => {
            state.loading = true;
        },
        [createRated.fulfilled]: (state, action) => {
            state.loading = false;
            state.ratedByProduct.unshift(action.payload.data);
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