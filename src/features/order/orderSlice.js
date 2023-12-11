import { createSlice } from '@reduxjs/toolkit';
import {
    fetchOrders,
    fetchOrder,
    fetchOrderByCode,
    fetchOrderByUser,
    createOrder,
    cancelOrder,
    updateOrder,
    deleteOrder
} from './path-api';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        orderByUser: [],
        order: null,
        loading: false,
        regex: '',
        message: '',
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {
        updateRegex: (state, action) => {
            action.payload === "Tất cả" ?
                state.regex = `status[regex]=` :
                state.regex = `status[regex]=${action.payload}`;
        }
    },
    extraReducers: {
        [fetchOrders.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrders.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = action.payload.orders;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchOrders.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchOrder.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload;

        },
        [fetchOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchOrderByCode.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrderByCode.fulfilled]: (state, action) => {
            state.loading = false;
            state.order = action.payload;
        },
        [fetchOrderByCode.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchOrderByUser.pending]: (state) => {
            state.loading = true;
        },
        [fetchOrderByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.orderByUser = action.payload.orders;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchOrderByUser.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createOrder.pending]: (state) => {
            state.loading = true;
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders.unshift(action.payload.data);
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [cancelOrder.pending]: (state) => {
            state.loading = true;
        },
        [cancelOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orderByUser = state.orderByUser.map((order) => {
                if (order._id === action.meta.arg.id) {
                    order.status = 'cancelled';
                }
                return order;
            });
        },
        [cancelOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateOrder.pending]: (state) => {
            state.loading = true;
        },
        [updateOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = state.orders.map((order) => {
                if (order._id === action.payload.data._id) {
                    order = action.payload.data;
                }
                return order;
            });
        },
        [updateOrder.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteOrder.pending]: (state) => {
            state.loading = true;
        },
        [deleteOrder.fulfilled]: (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(
                (order) => order._id !== action.payload.data._id
            );
        }
    }
});

export const { updateRegex } = orderSlice.actions;

export default orderSlice.reducer;