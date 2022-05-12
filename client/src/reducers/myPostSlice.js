import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'

const actionName = 'user';

export const initialState = {
    writePost: [{
        "_id": "",
        title: "",
        userId: {
            name: "",
            _id: ""
        },
        category: 0,
        image: "",
        post_content: "",
        area_name: "",
        post_location: "",
        isvalid: true,
        member_num: 1,
        member_min: 0,
        endtime: "",
    }],
    participatePost: [{
        "_id": "",
        title: "",
        userId: {
            name: "",
            _id: ""
        },
        category: 0,
        image: "",
        post_content: "",
        area_name: "",
        post_location: "",
        isvalid: true,
        member_num: 1,
        member_min: 0,
        endtime: "",
    }],
    isWriteNull: true,
    isPartyNull: true,
};

export const myPostSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        getWritePost: (state, action) => {
            state.writePost = action.payload
        },
        getParticipatePost: (state, action) => {
            state.participatePost = action.payload
        },
        checkWriteNull: (state, action) => {
            state.isWriteNull = action.payload
        },
        checkPartyNull: (state, action) => {
            state.isPartyNull = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => initialState);
    }
})

export const { getWritePost, getParticipatePost, checkWriteNull, checkPartyNull } = myPostSlice.actions;
export default myPostSlice.reducer;