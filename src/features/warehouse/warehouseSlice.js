import { createSlice } from "@reduxjs/toolkit";
import {
    fetchWarehouses,
    inWarehouse,
    outWarehouse,
} from "./path-api";

export const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: {
        warehouses: [],
        warehouse: null,
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchWarehouses.pending]: (state) => {
            state.loading = true;
        },
        [fetchWarehouses.fulfilled]: (state, action) => {
            state.loading = false;
            state.warehouses = action.payload.warehouses;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchWarehouses.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [inWarehouse.pending]: (state) => {
            state.loading = true;
        },
        [inWarehouse.fulfilled]: (state, action) => {
            state.loading = false;
            state.warehouses.unshift(action.payload.warehouseEntry);
        },
        [inWarehouse.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [outWarehouse.pending]: (state) => {
            state.loading = true;
        },
        [outWarehouse.fulfilled]: (state, action) => {
            state.loading = false;
            state.warehouses.unshift(action.payload.warehouseEntry);
        },
        [outWarehouse.rejected]: (state, action) => {
            state.loading = false;
            console.log(action.payload)
            state.message = action.payload;
        },
    },
});

export default warehouseSlice.reducer;