import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    showLoginModal,
    showSignupModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground, ModalTextWrap,
    ModalContainer, ModalTitleWrap,
    LocationButton, ModalTitleText,
    ModalButton, ButtonWrap,
    Wrap, XWrap, SignupInput, ContentWrap, ErrorMsgWrap,
    NameAgeWrap, Name, Age
} from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';

function SignupModal() {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState('');
    const [errorPwMessage, setErrorPwMessage] = useState('');
    const [errorNameMessage, setErrorNameMessage] = useState('');
    const [errorAgeMessage, setErrorAgeMessage] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [userInputInfo, setUserInputInfo] = useState({
        email: '',
        password: '',
        name: '',
        age: '',
        area_name: '',
    });

    /* 회원 정보 입력 관리 함수 */
    const handleInputValue = (key) => (e) => {
        setUserInputInfo({ ...userInputInfo, [key]: e.target.value });
    }

    /* 비밀번호 확인 */
    const handlePWcheck = (e) => {
        setPwCheck(e.target.value)
        if (e.target.value !== userInputInfo.password) {
            setErrorPwMessage('비밀번호가 일치하지 않습니다');
        } else {
            setErrorPwMessage('');
        }
    }
    /* 이메일 중복확인 요청 */
    // const handleEmailCheck = () => {

    // }

    /* 카카오지도 API로 현재 유저 좌표를 동단위로 변환 */
    const alterAddress = (position) => {
        let x = position.coords.longitude;
        let y = position.coords.latitude;
        if (x && y) {
            axios.get(
                `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
                        "Content-Type": "application/json"
                    }
                }
            ).then((result) => {
                let location = result.data.documents[0].region_3depth_name;
                setUserInputInfo({ ...userInputInfo, 'area_name': location });
                dispatch(inputModalText(`${location} 동네 인증에 성공했습니다.`));
                dispatch(changeModalImg('check_man'));
                dispatch(showConfirmModal(true));
            })
        }
    }
    /* 위치인증 확인 요청 */
    const getUserLocation = () => {
        dispatch(inputModalText('로 딩 중'));
        dispatch(changeModalImg('loading'));
        dispatch(showConfirmModal(true));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                alterAddress(position);
            });
        } else {
            dispatch(inputModalText('위치 인증 실패'));
            dispatch(changeModalImg('question'));
            dispatch(showConfirmModal(true));
        }

    }
    /* 에러 메세지 설정 함수*/
    const handleErrMsg = () => {
        if (userInputInfo.email || userInputInfo.password || userInputInfo.name || userInputInfo.age) {
            if (userInputInfo.email) {
                setErrorEmailMessage('')
            }
            if (userInputInfo.password) {
                setErrorPwMessage('')
            }
            if (userInputInfo.name) {
                setErrorNameMessage('')
            }
            if (userInputInfo.age) {
                setErrorAgeMessage('')
            }
        }
        if (!userInputInfo.email) {
            setErrorEmailMessage('이메일을 입력해주세요')
        }
        if (!userInputInfo.password) {
            setErrorPwMessage('비밀번호를 입력해주세요')
        }
        if (!pwCheck) {
            setErrorPwMessage('비밀번호 확인을 입력해주세요')
        }
        if (!userInputInfo.name) {
            setErrorNameMessage('이름을 입력해주세요')
        }
        if (!userInputInfo.age) {
            setErrorAgeMessage('나이를 입력해주세요')
        }
    }

    /* 회원가입 요청 */
    const handleSignup = () => {
        //입력값이 모두 존재할 경우만 요청보냄
        if (!userInputInfo.email || !userInputInfo.password || !userInputInfo.name || !userInputInfo.age) {
            handleErrMsg();
        }
        else if (
            userInputInfo.email &&
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
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showSignupModal(false));
                dispatch(showConfirmModal(true));

            }).catch((err) => {
                dispatch(inputModalText(err.response.data.message));
                dispatch(changeModalImg('question'));
                dispatch(showConfirmModal(true));
            })
        } else {
            handleErrMsg();
            setErrorMessage('모든 항목을 빠짐없이 입력해주세요.');
        }
    }

    useEffect(() => {
        setErrorEmailMessage(errorEmailMessage);
        setErrorPwMessage(errorPwMessage);
        setErrorNameMessage(errorNameMessage);
        setErrorAgeMessage(errorAgeMessage);
    }, [errorEmailMessage, errorPwMessage, errorNameMessage, errorAgeMessage])


    useEffect(() => {
        setPwCheck(pwCheck);
    }, [pwCheck])


    return (
        <>
            {/* onClick시 모달창 닫히게끔 모달창 띄우는 상태가 리덕스로 관리*/}
            <ModalBackground onClick={() => dispatch(showSignupModal(false))} />
            <ModalContainer>
                <XWrap>
                    <span onClick={() => dispatch(showSignupModal(false))}>&times;</span>
                </XWrap>
                <Wrap>
                    <ModalTextWrap>
                        <ModalTitleWrap>
                            <h2>회원가입</h2>
                            <ModalTitleText>
                                <p>이미 회원이신가요?</p>
                                <a onClick={() => {
                                    dispatch(showSignupModal(false))
                                    dispatch(showLoginModal(true))
                                }}>로그인 하기</a>
                            </ModalTitleText>
                        </ModalTitleWrap>
                    </ModalTextWrap>
                    <SignupInput>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <ContentWrap>
                                <span>이메일</span>
                                <input type='email' onChange={handleInputValue('email')} />
                            </ContentWrap>
                            <ErrorMsgWrap>
                                <p>{errorEmailMessage}</p>
                            </ErrorMsgWrap>
                            <ContentWrap>
                                <span>비밀번호</span>
                                <input
                                    type='password'
                                    onChange={handleInputValue('password')}
                                />
                            </ContentWrap>
                            <ErrorMsgWrap>
                                <p></p>
                            </ErrorMsgWrap>
                            <ContentWrap>
                                <span>비밀번호 확인</span>
                                <input
                                    type='password'
                                    onChange={handlePWcheck}
                                />
                            </ContentWrap>
                            <ErrorMsgWrap>
                                <p>{errorPwMessage}</p>
                            </ErrorMsgWrap>
                            <NameAgeWrap>
                                <Name>
                                    <span>이름</span>
                                    <input type='text' onChange={handleInputValue('name')} />
                                </Name>
                                <Age>
                                    <span>나이</span>
                                    <input type='number' onChange={handleInputValue('age')} />
                                </Age>
                            </NameAgeWrap>
                            <ErrorMsgWrap tag={'nameAge'}>
                                <p>{errorNameMessage}</p>
                                <p>{errorAgeMessage}</p>
                            </ErrorMsgWrap>
                        </form>
                    </SignupInput>
                    <ButtonWrap>
                        <LocationButton onClick={getUserLocation}>동네 인증하기</LocationButton>
                        <ModalButton type='submit' onClick={handleSignup}>회원가입</ModalButton>
                    </ButtonWrap>
                </Wrap>
            </ModalContainer>

        </>
    )
}
export default SignupModal;