import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCart,
    addToCart,
    updateProductFromCart,
    deleteProductFromCart,
    deleteAllProductFromCart,
} from "./path-api";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        productCart: [],
        totalPrice: 0,
        quantityCart: 0,
        loading: false,
        message: "",
    },
    reducers: {

        getCart: (state, action) => {
            state.cart = action.payload;
        },

        getProductCart: (state, action) => {
            state.productCart = action.payload;
        },
        getTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        getQuantityCart: (state, action) => {
            state.quantityCart = action.payload;
        },
    },
    extraReducers: {
        [fetchCart.pending]: (state) => {
            state.loading = true;
        },
        [fetchCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        },
        [fetchCart.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [addToCart.pending]: (state) => {
            state.loading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.cart.findIndex((item) => item._id === action.payload.cart._id);
            if (index >= 0) {
                state.cart[index] = action.payload.cart;
            } else {
                state.cart.push(action.payload.cart);
            }
        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProductFromCart.pending]: (state) => {
            state.loading = true;
        },
        [updateProductFromCart.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.cart.findIndex((item) => item._id === action.payload.cart._id);
            if (index >= 0) {
                state.cart[index] = action.payload.cart;
            }
        },
        [updateProductFromCart.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteProductFromCart.pending]: (state) => {
            state.loading = true;
        },
        [deleteProductFromCart.fulfilled]: (state, action) => {
            state.loading = false;
            const index = state.cart.findIndex((item) => item._id === action.payload.cart._id);
            if (index >= 0) {
                state.cart.splice(index, 1);
            }
        },
        [deleteProductFromCart.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteAllProductFromCart.pending]: (state) => {
            state.loading = true;
        },
        [deleteAllProductFromCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        },
        [deleteAllProductFromCart.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export const { getCart, getProductCart, getTotalPrice, getQuantityCart } = cartSlice.actions;

export default cartSlice.reducer;