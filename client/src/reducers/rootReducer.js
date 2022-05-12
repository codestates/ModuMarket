import { combineReducers } from "redux";
import loginSlice from './loginSlice';
import userInfoSlice from './userInfoSlice';
import modalSlice from './modalSlice';
import boardSlice from './boardSlice';
import myPostSlice from './myPostSlice';

const rootReducer = combineReducers({
    login: loginSlice,
    userInfo: userInfoSlice,
    modal: modalSlice,
    board: boardSlice,
    mypost: myPostSlice,
})

export default rootReducer;
