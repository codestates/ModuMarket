import axios from 'axios'
import { persistor } from '../../index';
import { REACT_APP_API_URL } from '../../config';
import { Link } from 'react-router-dom';
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { profileImg } from '../../assets/images';
import { logout } from '../../reducers/loginSlice';
import { getUserInfo, getUserImg } from '../../reducers/userInfoSlice'
import { getWritePost, getParticipatePost, checkWriteNull, checkPartyNull } from '../../reducers/myPostSlice'
import {
    showLoginModal,
    showSignupGateModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../reducers/modalSlice';
import {
    NavLink,
    NavContainer,
    NavButtons,
    NavButton,
    NavBoard
} from './styled'

function Header() {

    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const accessToken = useSelector((state) => state.login.accessToken);
    const userSocial = useSelector((state) => state.userInfo.userStatus);
    const userInfo = useSelector((state) => state.userInfo.userInfo);

    const purge = async () => {
        await persistor.purge();
    }

    const handleGetUserInfo = () => {
        axios.get(`${REACT_APP_API_URL}/user`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }

        ).then((result) => {
            dispatch(getUserInfo(result.data.data));
        })

    }

    function handleWritePost() {
        axios.get(`${REACT_APP_API_URL}/user/writepost`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }

        ).then((result) => {
            if (result.status === 200) {
                dispatch(checkWriteNull(false));
                dispatch(getWritePost(result.data.data));
            } else {
                dispatch(checkWriteNull(true));
            }
        })
    }

    function handleParticipatePost() {
        axios.get(`${REACT_APP_API_URL}/user/participatepost`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }

        ).then((result) => {
            if (result.status === 200) {
                dispatch(checkPartyNull(false));
                dispatch(getParticipatePost(result.data.data));
            } else {
                dispatch(checkPartyNull(true));
            }
        })
    }

    const handleLogout = async () => {
        axios.post(`${REACT_APP_API_URL}/sign/out`,
            {
                accessToken: accessToken
            })
            .then((result) => {
                dispatch(inputModalText(result.data.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showConfirmModal(true));
                dispatch(logout());
            })
    }
    const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL}`

    const handleKakaoLogout = () => {
        // setTimeout(() => purge(), 100)
        window.location.href = `${KAKAO_LOGOUT_URL}`
        purge();
    }
    const handleGithubLogout = async() => {
        await axios.post(`${REACT_APP_API_URL}/sign/out/github`,{},{
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        })
        setTimeout(() => purge(), 100)
    }


    return (
        <NavContainer>
            <NavLink to="/board">
                <NavBoard>
                    <span>
                        게시판
                    </span>
                </NavBoard>
            </NavLink>
            <NavLink to="/">
                <span>ModuMarket</span>
            </NavLink>
            {isLogin ? (
                <>
                    <NavButtons>
                        <NavLink to="/mypage" >
                            <NavButton onClick={async () => {
                                handleGetUserInfo();
                                handleWritePost();
                                handleParticipatePost();
                            }}>마이페이지</NavButton>
                        </NavLink>
                        {userSocial === 'own' ?
                            //일반 로그아웃
                            <NavButton onClick={async () => {
                                await handleLogout()
                                await setTimeout(() => purge(), 200)
                            }}>Logout</NavButton>
                            :
                            userSocial === 'kakao' ?
                                //카카오 로그아웃
                                <NavButton onClick={() => {
                                    handleKakaoLogout().then(() => {
                                        dispatch(inputModalText('로그아웃이 완료되었습니다.'));
                                        dispatch(changeModalImg('check_man'));
                                        dispatch(showConfirmModal(true));
                                        dispatch(logout());
                                    })

                                }
                                }
                                >Logout</NavButton>
                                :
                                // github 로그아웃
                                <NavButton onClick={() => {
                                    dispatch(logout());
                                    handleGithubLogout()
                                    dispatch(inputModalText('로그아웃이 완료되었습니다.'));
                                    dispatch(changeModalImg('check_man'));
                                    dispatch(showConfirmModal(true));

                                }}>Logout</NavButton>
                        }
                    </NavButtons>
                </>
            ) : (
                <>
                    <NavButtons>
                        <NavButton onClick={() => dispatch(showSignupGateModal(true))}>회원가입</NavButton>
                        <NavButton onClick={() => dispatch(showLoginModal(true))}>Login</NavButton>
                    </NavButtons>
                </>
            )}
        </NavContainer>
    )
}

export default Header;