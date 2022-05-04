import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
    showLoginModal,
    showSignupModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../reducers/modalSlice';
import { ModalBackground, ModalContainer, ModalText, SignupInput } from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../config';

function Signup() {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isPWCheck, setIsPWCheck] = useState(false);
    const [userInputInfo, setUserInputInfo] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        area_name: '한라산',
    });

    /* 회원 정보 입력 관리 함수 */
    const handleInputValue = (key) => (e) => {
        setUserInputInfo({ ...userInputInfo, [key]: e.target.value });
    }
    /* 비밀번호 확인 */
    const handlePWcheck = (key) => (e) => {
        setPasswordCheck({ ...passwordCheck, [key]: e.target.value });
        if (passwordCheck === userInputInfo.password) {
            setIsPWCheck(true);
        }
    }
    /* 이메일 중복확인 요청 */
    const handleEmailCheck = () => {

    }
    /* 위치인증 확인 요청 */
    const getUserLocation = () => {

    }
    /* 회원가입 요청 */
    const handleSignup = () => {
        //입력값이 모두 존재할 경우만 요청보냄
        if (userInputInfo.email &&
            userInputInfo.password &&
            userInputInfo.name &&
            userInputInfo.age 
            // &&userInputInfo.area_name
            ) {
            axios.post(
                `${REACT_APP_API_URL}/sign/up`,
                {
                    email: userInputInfo.email,
                    password: userInputInfo.password,
                    name: userInputInfo.name,
                    age: userInputInfo.age,
                    area_name: userInputInfo.area_name
                },
                { 'Content-Type': 'application/json', withCredentials: true }
            ).then((result) => {
                dispatch(inputModalText(result.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showConfirmModal(true));
            })
        } else {
            setErrorMessage('모든 항목을 빠짐없이 입력해주세요.');
        }
    }
    return (
        <>
            {/* onClick시 모달창 닫히게끔 모달창 띄우는 상태가 리덕스로 관리*/}
            <ModalBackground onClick={() => dispatch(showSignupModal(false))} />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showSignupModal(false))}>&times;</span>
                    <h2>회원가입</h2>
                    <p>이미 회원이신가요?
                        {/* Login 모달창으로 변경하도록 해당 상태 관리*/}
                        <button onClick={() => {
                            dispatch(showSignupModal(false))
                            dispatch(showLoginModal(true))
                        }}>로그인 하기</button>
                    </p>
                </ModalText>
                <SignupInput>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <span>이메일</span>
                        <input type='email' onChange={handleInputValue('email')} placeholder="E-mail을 입력해주세요" />
                        {/* <button>중복확인</button> */}
                        <span>비밀번호</span>
                        <input
                            type='password'
                            onChange={handleInputValue('password')}
                            placeholder="비밀번호를 입력해주세요" />
                        <span>비밀번호 확인</span>
                        <input
                            type='password'
                            onChange={handlePWcheck('passwordCheck')}
                            placeholder="비밀번호 확인을 위해 다시 입력해주세요" />
                        {isPWCheck ? <p>비밀번호가 일치합니다</p> : <p>비밀번호가 일치하지 않습니다</p>}
                        <span>이름</span>
                        <input type='text' onChange={handleInputValue('name')} />
                        <span>나이</span>
                        <input type='number' onChange={handleInputValue('age')} />
                        {/* <button onClick={getUserLocation}>동네 인증하기</button> */}
                        {/* <input type="checkbox"/> */}
                        <button type='submit' onClick={handleSignup}>
                            회원가입
                        </button>
                        <div className='alert-box'>{errorMessage}</div>
                    </form>
                </SignupInput>
            </ModalContainer>

        </>
    )
}
export default Signup;