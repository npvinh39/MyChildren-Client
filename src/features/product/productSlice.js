import { createSlice } from '@reduxjs/toolkit';
import {
    fetchProducts,
    fetchProductsWithDescription,
    fetchProduct,
    fetchProductPromotion,
    fetchProductOrder,
    fetchProductsByCategory,
    fetchDescriptionByProductId,
    createProduct,
    updateProduct,
    deleteProduct,
} from './path-api';


export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        description: {},
        product: null,
        productsPromotion: [],
        productsOrder: [],
        selectProducts: [],
        productsByCategory: [],
        images: [],
        loading: false,
        message: '',
        currentPage: 1,
        pageSize: 12,
        totalPages: 0,
        sort: null,
        pageSizeCategories: 12,
        currentPageCategories: 1,
        totalPagesCategories: 0,
        sortCategories: null,
    },

    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: {
        [fetchProducts.pending]: (state) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.selectProducts = action.payload.data.products;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductsWithDescription.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductsWithDescription.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload.data.products;
            // state.productsByCategory = state.products;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchProductsWithDescription.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProduct.pending]: (state) => {
            state.loading = true;
        },
        [fetchProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
            state.images = action.payload.images.map((image) => ({
                original: image.url,
                thumbnail: image.url,
            }));
        },
        [fetchProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductPromotion.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            // add action.payload to productsPromotion
            // state.productsPromotion = action.payload;
            const index = state.productsPromotion.findIndex(p => p._id === action.payload._id);
            if (index === -1) state.productsPromotion.push(action.payload);
        },
        [fetchProductPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductOrder.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductOrder.fulfilled]: (state, action) => {
            state.loading = false;
            // add action.payload to productsOrder
            const index = state.productsOrder.findIndex(p => p._id === action.payload._id);
            if (index === -1) {
                state.productsOrder.push(action.payload)
            };
        },
        [fetchProductOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProductsByCategory.pending]: (state) => {
            state.loading = true;
        },
        [fetchProductsByCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.productsByCategory = action.payload.products;
            console.log(action)
            state.totalPagesCategories = action.payload.totalPages;
            state.currentPageCategories = action.meta.arg.currentPage;
            state.pageSizeCategories = action.meta.arg.pageSize;
        },
        [fetchProductsByCategory.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchDescriptionByProductId.pending]: (state) => {
            state.loading = true;
        },
        [fetchDescriptionByProductId.fulfilled]: (state, action) => {
            state.loading = false;
            state.description = action.payload;
        },
        [fetchDescriptionByProductId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createProduct.pending]: (state) => {
            state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products.push(action.payload.data);
        },
        [createProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProduct.pending]: (state) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            const data = action.payload.data;

            const index = state.products.findIndex(p => p._id === data._id);
            if (index !== -1) state.products[index] = data;
        },
        [updateProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteProduct.pending]: (state) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            // delete from products
            const index = state.products.findIndex(p => p._id === action.payload._id);
            if (index !== -1) state.products.splice(index, 1);
        },
        [deleteProduct.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export const { products } = productSlice.actions;

export default productSlice.reducer;