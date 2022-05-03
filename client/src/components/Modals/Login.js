import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/loginSlice';
import { showLoginModal, showSignupModal } from '../../reducers/modalSlice';
import { ModalBackground, ModalContainer, ModalText, LoginInput } from './styled';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';


function Login() {
    const REST_API_KEY = "582364e7342bc8ebe03c9fb7bfd980a0";
    const REDIRECT_URI = "http://localhost:3000/sign/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

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
                dispatch(login(result.accessToken))
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
                        <button type='submit' onClick={handleLogin}>
                            로그인
                        </button>
                        
                        <h1><a href={KAKAO_AUTH_URL}>Kakao Login</a></h1>
                        
                        <div className='alert-box'>{errorMessage}</div>
                    </form>
                </LoginInput>
            </ModalContainer>
        </>
    )
}
export default Login;