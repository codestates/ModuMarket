import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/loginSlice';
import { showLoginModal, showSignupModal } from '../../reducers/modalSlice';
import { getUserInfo, setUserStatus } from '../../reducers/userInfoSlice'
import {
    ModalBackground,
    ModalContainer,
    ModalText,
    LoginInput,
    ModalButton,
} from './styled';
import axios from 'axios';
import { REACT_APP_API_URL, REDIRECT_URI } from '../../config';



function Login() {


    const GITHUB_APP_KEY = process.env.REACT_APP_GITHUB_APP_KEY;
    const GITHUB_REDIRECT_URL = process.env.REACT_APP_GITHUB_REDIRECT_URL;
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_KEY}&redirect_uri=${GITHUB_REDIRECT_URL}`
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


    const [errorMessage, setErrorMessage] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    })
    const dispatch = useDispatch();

    // 로그인 입력값을 loginInfo상태에 저장하는 함수
    const handleInputValue = (key) => (e) => {
        setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };
    //로그인 관리하는 함수
    const handleLogin = () => {
        // 두 값을 모두 입력했을 때
        if (loginInfo.email && loginInfo.password) {
            axios.post(
                `${REACT_APP_API_URL}/sign/in`,
                {
                    email: loginInfo.email,
                    password: loginInfo.password
                },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            ).then((result) => {
                let data = {
                    userInfo: {

                        id: result.data.data.id,
                        area_name: result.data.data.area_name
                    }
                }

                dispatch(getUserInfo(data))
                dispatch(login(result.data.data.accessToken))
                dispatch(showLoginModal(false));
            }
            )
        } else {
            setErrorMessage('이메일과 비밀번호를 모두 입력하세요');
        }
    }


    return (
        <>
            {/* onClick시 모달창 닫히게끔 모달창 띄우는 상태가 리덕스로 관리*/}
            <ModalBackground onClick={() => dispatch(showLoginModal(false))} />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showLoginModal(false))}>&times;</span>
                    <h2>로그인</h2>
                    <p>회원이 아니신가요?
                        {/* signup 모달창으로 변경하도록 해당 상태 관리*/}
                        <button onClick={() => {
                            dispatch(showLoginModal(false));
                            dispatch(showSignupModal(true));
                        }}>회원가입하기</button>
                    </p>
                </ModalText>
                <LoginInput>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <span>이메일</span>
                        <input type='email' onChange={handleInputValue('email')} placeholder="E-mail을 입력해주세요" />
                        <span>비밀번호</span>
                        <input
                            type='password'
                            onChange={handleInputValue('password')}
                            placeholder="비밀번호를 입력해주세요" />
                        <ModalButton type='submit'
                            onClick={() => {
                                handleLogin();
                                dispatch(setUserStatus('own'));
                            }}>
                            로그인
                        </ModalButton>
                        <div className='alert-box'>{errorMessage}</div>
                    </form>
                </LoginInput>
                <ModalButton onClick={() => {
                    window.location.href = `${KAKAO_AUTH_URL}`
                    dispatch(setUserStatus('kakao'))
                }}>
                    카카오로 로그인하기
                </ModalButton>
                <ModalButton onClick={() => {
                    window.location.href = `${GITHUB_AUTH_URL}`
                    dispatch(setUserStatus('github'));
                }}>
                    Github으로 로그인하기
                </ModalButton>
            </ModalContainer>
        </>
    )
}
export default Login;