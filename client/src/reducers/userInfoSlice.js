import { createSlice } from '@reduxjs/toolkit'

const actionName = 'user';

export const initialState = {
    userInfo: {
        id: "",
        email: "",
        name: "",
        age: 0,
        area_name: "",
    },
    userStatus: ""
};

export const userInfoSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.userInfo = action.payload.userInfo
        },
        setUserStatus: (state, action) => {
            state.userStatus = action.payload
        }
    }
})

export const { getUserInfo, setUserStatus } = userInfoSlice.actions;
export default userInfoSlice.reducer;