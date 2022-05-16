import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    showSignupSocialModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground, ModalTextWrap,
    ModalContainer, ModalTitleWrap, FormWrap,
    ButtonWrap, Wrap, XWrap, SignupInput,
    NameAgeWrap, Name, Age, LocationButton, ModalButton
} from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../../config';
import gitIcon from '../../../assets/github_icon_dark.png'
import kakaoIcon from '../../../assets/kakao.png'

function SignupSocialModal() {

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const userSocialId = useSelector((state) => state.modal.socialInfoId);
    const userSocialEmail = useSelector((state) => state.modal.socialInfoEmail);
    const userSocial = useSelector((state) => state.userInfo.userStatus)
    const [userInputInfo, setUserInputInfo] = useState({
        id: userSocialId,
        email: userSocialEmail,
        name: '',
        age: '',
        area_name: '',
    });

    /* 회원 정보 입력 관리 함수 */
    const handleInputValue = (key) => (e) => {
        setUserInputInfo({ ...userInputInfo, [key]: e.target.value });
    }

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
            console.log('위치 인증 실패');
            //loc.innerHTML = "이 문장은 사용자의 웹 브라우저가 Geolocation API를 지원하지 않을 때 나타납니다!";

        }

    }

    /* Kakao 회원가입 요청 */
    const handleKakaoSignup = () => {
        //입력값이 모두 존재할 경우만 요청보냄
        if (
            userInputInfo.id &&
            userInputInfo.email &&
            userInputInfo.name &&
            userInputInfo.age &&
            userInputInfo.area_name
        ) {
            axios.post(
                `${REACT_APP_API_URL}/sign/in/kakao`,
                {
                    id: userInputInfo.id,
                    email: userInputInfo.email,
                    name: userInputInfo.name,
                    age: userInputInfo.age,
                    area_name: userInputInfo.area_name
                },
                { 'Content-Type': 'application/json', withCredentials: true }
            ).then((result) => {
                // 회원가입 완료시
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showSignupSocialModal(false));
                dispatch(showConfirmModal(true));

            })
        } else {
            setErrorMessage('모든 항목을 빠짐없이 입력해주세요.');
        }
    }
    /* Github 회원가입 요청 */
    const handleGithubSignup = () => {
        //입력값이 모두 존재할 경우만 요청보냄
        if (
            userInputInfo.id &&
            userInputInfo.email &&
            userInputInfo.name &&
            userInputInfo.age &&
            userInputInfo.area_name
        ) {
            axios.post(
                `${REACT_APP_API_URL}/sign/in/github`,
                {
                    id: userInputInfo.id,
                    email: userInputInfo.email,
                    name: userInputInfo.name,
                    age: userInputInfo.age,
                    area_name: userInputInfo.area_name
                },
                { 'Content-Type': 'application/json', withCredentials: true }
            ).then((result) => {
                //회원가입 완료시
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showSignupSocialModal(false));
                dispatch(showConfirmModal(true));
                //홈으로 redirect
                window.location.replace('/')


            })
        } else {
            setErrorMessage('모든 항목을 빠짐없이 입력해주세요.');
        }
    }
    return (
        <>
            <ModalBackground onClick={() => dispatch(showSignupSocialModal(false))} />
            <ModalContainer>
                <XWrap>
                    <span onClick={() => dispatch(showSignupSocialModal(false))}>&times;</span>
                </XWrap>
                <Wrap>
                    <ModalTextWrap>
                        <ModalTitleWrap>
                            <h2>소셜 회원가입</h2>
                        </ModalTitleWrap>
                    </ModalTextWrap>
                </Wrap>
                <FormWrap onSubmit={(e) => e.preventDefault()}>
                    <SignupInput>
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
                    </SignupInput>
                    <ButtonWrap>
                        <LocationButton onClick={getUserLocation}>동네 인증하기</LocationButton>
                        {
                            userSocial === 'kakao' ?
                                <ModalButton background="#F7E600" type='submit' onClick={handleKakaoSignup}>
                                    <img src={kakaoIcon} alt="kakaoIcon" />
                                    카카오로 회원가입
                                </ModalButton>
                                :
                                <ModalButton background="white" type='submit' onClick={() => {
                                    handleGithubSignup();
                                    // window.location.href = `${REACT_APP_HOME_URL}`
                                }}>
                                    <img src={gitIcon} alt="gitIcon" />
                                    Github으로 회원가입
                                </ModalButton>
                        }
                        <div className='alert-box'>{errorMessage}</div>
                    </ButtonWrap>
                </FormWrap>
            </ModalContainer>
        </>
    )
}
export default SignupSocialModal;