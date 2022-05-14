import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../config';
import { AuthContainer } from './styled';
import { confirmImg } from '../../assets/images';
import { login } from '../../reducers/loginSlice';
import { getUserInfo } from '../../reducers/userInfoSlice'
import {
    showSignupSocialModal,
    showLoginModal,
    inputSocialId,
    inputSocialEmail,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../reducers/modalSlice';


const Auth = ({ social }) => {

    const dispatch = useDispatch();
    if (social === 'kakao') {
        const REDIRECT_URI = "https://localhost:3000/sign/kakao/callback";
        const code = new URL(window.location.href).searchParams.get("code");
        const kakaoToken = () => {
            let kakaoAccessToken = ' ';
            axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
                { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } })
                .then((result) => {
                    kakaoAccessToken = result.data.access_token
                    axios.get(`${REACT_APP_API_URL}/sign/kakao/callback`,
                        { headers: { "authorization": `Bearer ${kakaoAccessToken}` } })
                        .then((result) => {
                            //자체 서버의 accessToken이 있을 경우 바로 로그인
                            if (result.data.accessToken) {
                                // ! 소셜 로그인 시 id값 서버에서 받아와야함

                                let data = {
                                    userInfo: {
                                        id: result.data.id,
                                        area_name: result.data.area_name,
                                        name: result.data.name
                                    }
                                }
                                dispatch(showLoginModal(false));
                                dispatch(getUserInfo(data));
                                dispatch(inputModalText(result.data.message));
                                dispatch(login(result.data.accessToken))
                                dispatch(changeModalImg('check_man'));
                                dispatch(showConfirmModal(true));
                            } else {
                                //자체 서버의 accessToken이 없을 경우 회원가입으로 추가정보 입력필요

                                dispatch(inputSocialId(result.data.id));
                                dispatch(inputSocialEmail(result.data.email));
                                dispatch(showSignupSocialModal(true));
                            }

                        })
                })
        }
        kakaoToken();

    } else {
        const code = new URL(window.location.href).searchParams.get("code");
        const githubToken = () => {
            if (!code) {
                window.loaction.replace('/')
            } else {
                axios.get(`${REACT_APP_API_URL}/sign/github/callback`,
                    { params: { code: code } },
                    { withCredentials: true }
                ).then((result) => {
                    if (result.data.accessToken) {
                        let data = {
                            userInfo: {
                                id: result.data.id,
                                area_name: result.data.area_name,
                                name: result.data.name
                            }
                        }
                        dispatch(showLoginModal(false));
                        dispatch(getUserInfo(data));
                        dispatch(inputModalText(result.data.message));
                        dispatch(login(result.data.accessToken))
                        dispatch(changeModalImg('check_man'));
                        dispatch(showConfirmModal(true));
                    } else {
                        console.log(result);
                        dispatch(inputSocialId(result.data.id));
                        dispatch(inputSocialEmail(result.data.email));
                        dispatch(showSignupSocialModal(true));
                    }
                }
                )
            }
        }
        githubToken();
    }



    return (
        <AuthContainer>
            <h1>모두의 마켓</h1>
            <h2>알뜰한 소비를 위한 공동구매 플랫폼</h2>
            <img src={confirmImg.loading} alt={`loading`} />
        </AuthContainer>
    )

};
export default Auth;