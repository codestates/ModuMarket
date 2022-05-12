import { createSlice } from '@reduxjs/toolkit'

const actionName = 'cardInfo';

export const initialState = {
    cardInfo: {
        "_id" :"",
        title: "",
        userId: {
            name: "",
            _id : ""
        }, 
        category: 0,
        image: "",
        post_content: "",
        area_name : "", 
        post_location : "",
        isvalid : true,
        member_num : 1,
        member_min : 0,
        endtime : "",
    },
    isApplied: false
};

export const boardSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        getCardInfo: (state, action) => {
            state.cardInfo = action.payload.cardInfo
        },
        isAppliedInfo : (state, action) => {
            state.isApplied = action.payload.isApplied
        },
    }
})

export const { getCardInfo, isAppliedInfo } = boardSlice.actions;
export default boardSlice.reducer;