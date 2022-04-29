import { combineReducers } from "redux";
import loginSlice from './loginSlice';
import userInfoSlice from './userInfoSlice';
import modalSlice from './modalSlice';


export const rootReducer = combineReducers({
    login: loginSlice,
    userInfo: userInfoSlice,
    modal: modalSlice,
})