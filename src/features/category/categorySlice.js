import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCategories,
    fetchCategoriesForProduct,
    fetchCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./path-api";

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        categoriesForProduct: [],
        category: {},
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.loading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload.data.categories;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchCategoriesForProduct.pending]: (state) => {
            state.loading = true;
        },
        [fetchCategoriesForProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.categoriesForProduct = action.payload.categories;
        },
        [fetchCategoriesForProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchCategory.pending]: (state) => {
            state.loading = true;
        },
        [fetchCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        [fetchCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createCategory.pending]: (state) => {
            state.loading = true;
        },
        [createCategory.fulfilled]: (state, action) => {
            state.loading = false;
            // push new category to categories
            console.log(action.payload)
            state.categories.unshift(action.payload.data);

        },
        [createCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateCategory.pending]: (state) => {
            state.loading = true;
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = false;
            // update category in categories
            const index = state.categories.findIndex((category) => category._id === action.payload.data._id);
            if (index >= 0) {
                state.categories[index] = action.payload.data;
            }
        },
        [updateCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteCategory.pending]: (state) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
            // remove category in categories
            const index = state.categories.findIndex((category) => category._id === action.meta.arg);
            if (index >= 0) {
                state.categories.splice(index, 1);
            }
        },
        [deleteCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        }
    },
});

// export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;