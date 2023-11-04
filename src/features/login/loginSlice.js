import { createSlice } from '@reduxjs/toolkit'
import { onRegister, onLogin, onLogout } from './path-api'
import Cookies from 'js-cookie'
const access_Token = Cookies.get('accessToken')

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        isAuth: !!access_Token,
        key: 'value',
    },
    reducers: {
        login: (state, action) => {
            state.isAuth = action.payload
            console.log('state', state)
            console.log('action', action)
        },
        logout: (state) => {
            state.isAuth = false
        },
        key: (state, action) => {
            state.key = action.payload
        }
    },
    extraReducers: {
        [onRegister.pending]: (state) => {
            state.loading = true
        },
        [onRegister.fulfilled]: (state, action) => {
            state.loading = false
            state.isAuth = true
            state.data = action.payload
        },
        [onRegister.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload
        },
        [onLogin.pending]: (state) => {
            state.loading = true
        },
        [onLogin.fulfilled]: (state, action) => {
            state.loading = false
            state.isAuth = true
            state.data = action.payload
        },
        [onLogin.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload
        },
        [onLogout.pending]: (state) => {
            state.loading = true
        },
        [onLogout.fulfilled]: (state, action) => {
            state.loading = false
            state.isAuth = false
            state.data = action.payload
        },
        [onLogout.rejected]: (state, action) => {
            state.loading = false
            state.message = action.payload
        },
    }

})
export const { isAuth, login, logout } = loginSlice.actions

export default loginSlice.reducer