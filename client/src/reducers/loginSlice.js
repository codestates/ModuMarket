import { createSlice } from '@reduxjs/toolkit'

const actionName = 'authentication';
export const initialState = {
    isLogin: false,
    accessToken: "",
};

export const loginSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.accessToken = '';
        }
    }
})

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;