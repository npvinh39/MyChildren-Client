import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUsers,
    fetchUser,
    fetchProfile,
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
            const index = state.users.findIndex((x) => x.id === action.payload.data.id);
            if (index >= 0) {
                state.users[index] = action.payload.data;
            }
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
    },
});

export default userSlice.reducer;