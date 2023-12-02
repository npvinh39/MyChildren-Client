import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUsers,
    fetchUser,
    fetchProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    createUser,
    updateUser
} from './path-api';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: null,
        profile: null,
        cartUser: null,
        loading: false,
        status: null,
        message: '',
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.loading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchUsers.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchUser.pending]: (state) => {
            state.loading = true;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        [fetchUser.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchProfile.pending]: (state) => {
            state.loading = true;
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.profile = action.payload;
            state.cartUser = action.payload.cart;
        },
        [fetchProfile.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateProfile.pending]: (state) => {
            state.loading = true;
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.loading = false;
            // update profile
            state.profile = action.payload.data;
        },
        [updateProfile.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [changePassword.pending]: (state) => {
            state.loading = true;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            // update profile
            // state.profile = action.payload.data;
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [forgotPassword.pending]: (state) => {
            state.loading = true;
        },
        [forgotPassword.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [forgotPassword.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [resetPassword.pending]: (state) => {
            state.loading = true;
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.status = action.meta.requestStatus;
        },
        [resetPassword.rejected]: (state, action) => {
            state.loading = false;
            console.log("Failed to reset password: ", action);
            state.status = action.meta.requestStatus;
            state.message = action.payload;
        },
        [createUser.pending]: (state) => {
            state.loading = true;
        },
        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.unshift(action.payload.data);
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateUser.pending]: (state) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            // update profile
            state.profile = action.payload.data;
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default userSlice.reducer;