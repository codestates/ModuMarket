import { createSlice } from '@reduxjs/toolkit'

const actionName = 'modal';
export const initialState = {
    loginModal: false,
    signupGateModal: false,
    signupModal: false,
    signupSocialModal: false,
    signoutModal: false,
    signoutSocialModal: false,
    findPWModal: false,
    deleteModal:false,
    registerModal: false,
    reviseRegisterModal:false,
    locationModal: false,
    chattingModal: false,
    notificationModal: false,
    confirmModal: false,
    myInfoModal: false,
    myPwCheckModal: false,
    myNewPwModal: false,
    loginConfirmModal : false,
    recruitmentCompleteModal : false,
    participateModal:false,
    cancelParticipateModal : false,
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
        },
        showRegisterModal: (state, action) => {
            state.registerModal = action.payload
        },
        showChattingModal: (state, action) => {
            state.chattingModal = action.payload
        },
        showMyInfoModal: (state, action) => {
            state.myInfoModal = action.payload;
        },
        showMyPwCheckModal: (state, action) => {
            state.myPwCheckModal = action.payload;
        },
        showMyNewPwModal: (state, action) => {
            state.myNewPwModal = action.payload;
        },
        showSignoutModal: (state, action) => {
            state.signoutModal = action.payload;
        },
        showSignoutSocialModal: (state, action) => {
            state.signoutSocialModal = action.payload;
        },
        showReviseRegisterModal : (state, action) =>{  
            state.reviseRegisterModal = action.payload;
        },
        showDeleteModal : (state, action) =>{  
            state.deleteModal = action.payload;
        },
        showLoginConfirmModal : (state, action) =>{  
            state.loginConfirmModal = action.payload;
        },
        showRecruitmentCompleteModal : (state, action) =>{  
            state.recruitmentCompleteModal = action.payload;
        },
        showParticipateModal : (state, action) =>{  
            state.participateModal = action.payload;
        },
        showCancelParticipateModal : (state, action) =>{  
            state.cancelParticipateModal = action.payload;
        },
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
    inputSocialEmail,
    showRegisterModal,
    showChattingModal,
    showMyInfoModal,
    showMyPwCheckModal,
    showMyNewPwModal,
    showSignoutModal,
    showSignoutSocialModal,
    showReviseRegisterModal,
    showDeleteModal,
    showLoginConfirmModal,
    showRecruitmentCompleteModal,
    showParticipateModal,
    showCancelParticipateModal

} = modalSlice.actions;

export default modalSlice.reducer;
