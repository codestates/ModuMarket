import { createSlice } from '@reduxjs/toolkit'

const actionName = 'modal';
export const initialState = {
    loginModal: false,
    signupGateModal: false,
    signupModal: false,
    signupSocialModal: false,
    findPWModal: false,
    registerModal: false,
    locationModal: false,
    notificationModal: false,
    confirmModal: false,
    modalInformText: "",
    modalImg: "",
    socialInfoId: '',
    socialInfoEmail: '',
};

export const modalSlice = createSlice({
    name: actionName,
    initialState,
    reducers: {
        showLoginModal: (state, action) => {
            state.loginModal = action.payload;
        },
        showSignupGateModal: (state, action) => {
            state.signupGateModal = action.payload;
        },
        showSignupModal: (state, action) => {
            state.signupModal = action.payload;
        },
        showSignupSocialModal: (state, action) => {
            state.signupSocialModal = action.payload;
        },
        showConfirmModal: (state, action) => {
            state.confirmModal = action.payload;
        },
        inputModalText: (state, action) => {
            state.modalInformText = action.payload;
        },
        changeModalImg: (state, action) => {
            state.modalImg = action.payload;
        },
        inputSocialId: (state, action) => {
            state.socialInfoId = action.payload;
        },
        inputSocialEmail: (state, action) => {
            state.socialInfoEmail = action.payload;
        }
    }
})

export const {
    showLoginModal,
    showSignupModal,
    showSignupSocialModal,
    showSignupGateModal,
    showConfirmModal,
    inputModalText,
    changeModalImg,
    inputSocialId,
    inputSocialEmail
} = modalSlice.actions;

export default modalSlice.reducer;
