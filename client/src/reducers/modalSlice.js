import { createSlice } from '@reduxjs/toolkit'

const actionName = 'modal';
export const initialState = {
    loginModal: false,
    signupModal: false,
    findPWModal: false,
    registerModal: false,
    locationModal: false,
    notificationModal: false,
    confirmModal: false,
    modalInformText: "",
    modalImg: "",
};

export const modalSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        showLoginModal: (state, action) => {
            state.loginModal = action.payload;
        },
        showSignupModal: (state, action) => {
            state.signupModal = action.payload;
        },
        showConfirmModal: (state, action) => {
            state.confirmModal = action.payload
        },
        inputModalText: (state, action) => {
            state.modalInformText = action.payload
        },
        changeModalImg: (state, action) => {
            state.modalImg = action.payload
        }
    }
})

export const {
    showLoginModal,
    showSignupModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} = modalSlice.actions;

export default modalSlice.reducer;
