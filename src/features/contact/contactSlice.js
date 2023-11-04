import { createSlice } from "@reduxjs/toolkit";
import {
    fetchContacts,
    fetchContact,
    createContact,
    updateContact,
    deleteContact,
} from "./path-api";

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contacts: [],
        contact: null,
        loading: false,
        message: "",
        currentPage: 1,
        pageSize: 6,
        totalPages: 0,
    },
    reducers: {},
    extraReducers: {
        [fetchContacts.pending]: (state) => {
            state.loading = true;
        },
        [fetchContacts.fulfilled]: (state, action) => {
            state.loading = false;
            state.contacts = action.payload.contacts;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.meta.arg.currentPage;
            state.pageSize = action.meta.arg.pageSize;
        },
        [fetchContacts.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [fetchContact.pending]: (state) => {
            state.loading = true;
        },
        [fetchContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.contact = action.payload.contact;
        },
        [fetchContact.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [createContact.pending]: (state) => {
            state.loading = true;
        },
        [createContact.fulfilled]: (state, action) => {
            state.loading = false;
            state.contacts.unshift(action.payload.contact);
        },
        [createContact.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [updateContact.pending]: (state) => {
            state.loading = true;
        },
        [updateContact.fulfilled]: (state, action) => {
            state.loading = false;
            const newContacts = state.contacts.map((contact) =>
                contact._id === action.payload.contact._id
                    ? action.payload.contact
                    : contact
            );
            state.contacts = newContacts;
        },
        [updateContact.rejected]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [deleteContact.pending]: (state) => {
            state.loading = true;
        },
        [deleteContact.fulfilled]: (state, action) => {
            state.loading = false;
            const newContacts = state.contacts.filter(
                (contact) => contact._id !== action.payload.contact._id
            );
            state.contacts = newContacts;
        }
    },
});

export default contactSlice.reducer;