import { createSlice } from '@reduxjs/toolkit'

const actionName = 'authentication';
export const initialState = {
    isLogin: false
};

export const loginSlice = createSlice({
    actionName,
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;