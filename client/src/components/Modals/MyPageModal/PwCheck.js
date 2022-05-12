import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    showMyPwCheckModal,
    showMyNewPwModal,
    showConfirmModal,
    inputModalText,
    changeModalImg,
} from '../../../reducers/modalSlice';
import {
    ModalBackground,
    ModalContainer,
    ModalText,
    InputPW,
    ModalButton,
    InputErrorMessage
} from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';

const PwCheck = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const [errorMessage, setErrorMessage] = useState('');
    const [pw, setPw] = useState('');

    const handleInputValue = (e) => {
        setPw(...pw, e.target.value);
    }

    const handlePasswordAuth = () => {
        axios.post(`${REACT_APP_API_URL}/user`,
            {
                password: pw
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }
        ).then((result) => {
            if (result.status === 204) {
                setErrorMessage(result.data.message);
            } else {
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showMyPwCheckModal(false));
                dispatch(showConfirmModal(true));
                dispatch(showMyNewPwModal(true));
            }
        }).catch((err) => {
            dispatch(inputModalText(err.response.data.message));
            dispatch(changeModalImg('question'));
            dispatch(showConfirmModal(true));
        })
    }


    return (
        <>
            <ModalBackground />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showMyPwCheckModal(false))}>&times;</span>
                    <h2>비밀번호 확인</h2>
                    <p>비밀번호 입력</p>
                </ModalText>
                <InputPW>
                    <input
                        type='password'
                        onChange={handleInputValue}
                        placeholder="비밀번호를 입력해주세요" />
                </InputPW>
                <InputErrorMessage>
                    {errorMessage}
                </InputErrorMessage>
                <ModalButton onClick={async () => {
                    await handlePasswordAuth();

                }}>
                    확인</ModalButton>
            </ModalContainer>
        </>
    )
}

export default PwCheck;