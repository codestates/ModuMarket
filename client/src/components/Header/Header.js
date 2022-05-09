import axios from 'axios'
import { REACT_APP_API_URL } from '../../config';
import { Link } from 'react-router-dom';
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/loginSlice';
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

    const handleGetUserInfo = () => {

    }
    const handleLogout = async() => {
        // axios.post(`${REACT_APP_API_URL}/sign/out`,
        //     {
        //         accessToken: accessToken
        //     })
        //     .then((result) => {
        //         dispatch(inputModalText(result.data.message));
        //         dispatch(changeModalImg('check_man'));
        //         dispatch(showConfirmModal(true));
        //         dispatch(logout());
        //     })
    }
    const KAKAO_LOGOUT_LEDERECT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=${process.env.REACT_APP_KAKAO_LOGOUT_REDIRECT_URL}`

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
                        <NavLink to="/mypage">
                            <NavButton onClick={handleGetUserInfo}>마이페이지</NavButton>
                        </NavLink>
                        {/* <NavButton onClick={handleLogout}>Logout</NavButton> */}
                        <NavButton onClick={() => window.location.href = `${KAKAO_LOGOUT_LEDERECT_URL}`}>Logout</NavButton>
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