import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'


const actionName = 'user';

export const initialState = {
    userInfo: {
        id: "",
        email: "",
        name: "",
        age: 0,
        area_name: "",
    },
    userImg: "default",
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
        },
        changeUserArea: (state, action) => {
            state.userInfo.area_name = action.payload
        },
        getUserImg: (state, action) => {
            state.userImg = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const { getUserInfo, setUserStatus, changeUserArea, getUserImg } = userInfoSlice.actions;
export default userInfoSlice.reducer;