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
    ModalContainerPWCheck,
    ModalTextPW,
    InputPW,
    ModalButton,
    InputErrorMessage
} from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';

const PwInput = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const [errorMessage, setErrorMessage] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');

    const handleInputValue = (e) => {
        setPw(e.target.value);
    }
    const checkPasswordSame = (e) => {
        if (e.target.value !== pw) {
            setErrorMessage('비밀번호가 일치하지 않습니다');
        } else {
            setPwCheck(e.target.value);
            setErrorMessage('');
        }
    }

    const handlePasswordChange = () => {
        if (!pw) {
            setErrorMessage('비밀번호를 입력해주세요');
        } else if (pw !== pwCheck) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
        }
        else {
            axios.patch(`${REACT_APP_API_URL}/user`,
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
                    dispatch(showMyNewPwModal(false));
                    dispatch(showConfirmModal(true));
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
        setPwCheck(pw);
    }, [pw, pwCheck])


    return (
        <>
            <ModalBackground />
            <ModalContainerPWCheck>
                <ModalTextPW>
                    <span onClick={() => dispatch(showMyNewPwModal(false))}>&times;</span>
                    <h2>비밀번호 확인</h2>
                    <p>새로운 비밀번호</p>
                    <InputPW type="password" onChange={handleInputValue}></InputPW>
                    <p>새로운 비밀번호 확인</p>
                    <InputPW type="password" onChange={checkPasswordSame}></InputPW>
                    <InputErrorMessage>
                        {errorMessage}
                    </InputErrorMessage>
                </ModalTextPW>
                <ModalButton onClick={() => {
                    handlePasswordChange();
                }}>
                    확인</ModalButton>
            </ModalContainerPWCheck>
        </>
    )
}

export default PwInput;