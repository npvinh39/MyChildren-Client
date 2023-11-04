import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPromotions,
    fetchPromotion,
    createPromotion,
    updatePromotion,
    deletePromotion,
} from "./path-api";

export const promotionSlice = createSlice({
    name: "promotion",
    initialState: {
        promotions: [],
        promotion: null,
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchPromotions.pending]: (state) => {
            state.loading = true;
        },
        [fetchPromotions.fulfilled]: (state, action) => {
            state.loading = false;
            state.promotions = action.payload.data.promotions;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchPromotions.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchPromotion.pending]: (state) => {
            state.loading = true;
        },
        [fetchPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.promotion = action.payload;

        },
        [fetchPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createPromotion.pending]: (state) => {
            state.loading = true;
        },
        [createPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.promotions.unshift(action.payload.data);
        },
        [createPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updatePromotion.pending]: (state) => {
            state.loading = true;
        },
        [updatePromotion.fulfilled]: (state, action) => {
            state.loading = false;
            const newPromotion = action.payload;
            console.log("newPromotion: " + newPromotion)
            // const index = state.promotions.findIndex(
            //     (item) => item.id === newPromotion.id
            // );
            // if (index >= 0) {
            //     state.promotions[index] = newPromotion;
            // }
        },
        [updatePromotion.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deletePromotion.pending]: (state) => {
            state.loading = true;
        },
        [deletePromotion.fulfilled]: (state, action) => {
            state.loading = false;
            const id = action.payload;
            state.promotions = state.promotions.filter(
                (item) => item.id !== id
            );
        },
        [deletePromotion.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default promotionSlice.reducer;