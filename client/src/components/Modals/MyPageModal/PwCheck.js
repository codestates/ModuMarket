import React, { useEffect, useState } from 'react';
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
    ModalContainerPW,
    ModalTextPW,
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
        setPw(e.target.value);
    }

    // 암호화된 비밀번호를 가져와서 해독후 클라이언트에서 보내주는 문자열 비밀번호를 비교해서 보내주기
    const handlePasswordAuth = () => {
        if (!pw) {
            setErrorMessage('비밀번호를 입력해주세요');
        } else {
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
                    dispatch(changeModalImg('check_woman1'));
                    dispatch(showMyPwCheckModal(false));
                    dispatch(showConfirmModal(true));
                    dispatch(showMyNewPwModal(true));
                }
            }).catch((err) => {
                setErrorMessage(err.response.data.message);
            })
        }
    }

    useEffect(() => {
        setErrorMessage(errorMessage);
    }, [errorMessage])

    useEffect(() => {
        setPw(pw);
    }, [pw])


    return (
        <>
            <ModalBackground />
            <ModalContainerPW>
                <ModalTextPW>
                    <span onClick={() => dispatch(showMyPwCheckModal(false))}>&times;</span>
                    <h2>비밀번호 확인</h2>
                    <p>현재 비밀번호를 입력해주세요</p>
                    <InputPW type="password" onChange={handleInputValue}></InputPW>
                    <InputErrorMessage>
                        {errorMessage}
                    </InputErrorMessage>
                </ModalTextPW>
                <ModalButton onClick={() => {
                    handlePasswordAuth();
                }}>
                    확인</ModalButton>
            </ModalContainerPW>
        </>
    )
}

export default PwCheck;