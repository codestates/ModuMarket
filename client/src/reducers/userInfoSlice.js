import { createSlice } from '@reduxjs/toolkit'

const actionName = 'authentication';

export const initialState = {
    userInfo: {
        id: "",
        email: "",
        name: "",
        age: 0,
        area_name: "",
    }
};

export const userInfoSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        getUserInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})

export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;