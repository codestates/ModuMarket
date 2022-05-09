import { combineReducers } from "redux";
import loginSlice from './loginSlice';
import userInfoSlice from './userInfoSlice';
import modalSlice from './modalSlice';
import boardSlice from './boardSlice';

const rootReducer = combineReducers({
    login: loginSlice,
    userInfo: userInfoSlice,
    modal: modalSlice,
    board : boardSlice,
})

export default rootReducer;