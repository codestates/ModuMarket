import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reducers/loginSlice'
import {
    showMyInfoModal,
    showSignoutModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground,
    ModalContainer,
    ModalText,
    ModalButton
} from '../styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';


// ! 아직 연결 안된 모달
const SignoutSocial = () => {
    // const userStatus = useSelector((state) => state.userInfo.userStatus);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);

    const handleSignout = () => {
        axios.delete(`${REACT_APP_API_URL}/user`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true
            }
        ).then((result) => {
            dispatch(showMyInfoModal(false));
            dispatch(showSignoutModal(false));
            dispatch(inputModalText(result.data.message));
            dispatch(changeModalImg('check_circle'));
            dispatch(showConfirmModal(true));
            dispatch(logout());
        })
    }

    return (
        <>
            <ModalBackground onClick={() => dispatch(showSignoutModal(false))} />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showSignoutModal(false))}>&times;</span>
                    <p>정말로 탈퇴하시겠습니까?</p>
                </ModalText>
                <ModalButton onClick={handleSignout}>
                    확인</ModalButton>
            </ModalContainer>
        </>
    )
}

export default SignoutSocial;