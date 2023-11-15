import { createSlice } from "@reduxjs/toolkit";
import {
    fetchAddress,
    fetchAddressById,
    fetchAddressByUserId,
    addAddress,
    updateDefaultAddress,
    updateAddress,
    deleteAddress,
} from "./path-api";

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        addresses: [],
        address: [],
        loading: false,
        message: "",
    },
    reducers: {
        getAddress: (state, action) => {
            state.address = action.payload;
        },
    },
    extraReducers: {
        [fetchAddress.pending]: (state) => {
            state.loading = true;
        },
        [fetchAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [fetchAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchAddressById.pending]: (state) => {
            state.loading = true;
        },
        [fetchAddressById.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [fetchAddressById.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchAddressByUserId.pending]: (state) => {
            state.loading = true;
        },
        [fetchAddressByUserId.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [fetchAddressByUserId.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [addAddress.pending]: (state) => {
            state.loading = true;
        },
        [addAddress.fulfilled]: (state, action) => {
            state.loading = false;
            // push new address to array
            state.address.push(action.payload.data);
        },
        [addAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateDefaultAddress.pending]: (state) => {
            state.loading = true;
        },
        [updateDefaultAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [updateDefaultAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateAddress.pending]: (state) => {
            state.loading = true;
        },
        [updateAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [updateAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteAddress.pending]: (state) => {
            state.loading = true;
        },
        [deleteAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.address = action.payload;
        },
        [deleteAddress.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        }
    },
});

export const { getAddress } = addressSlice.actions;

export default addressSlice.reducer;