import axios from 'axios'
import { REACT_APP_API_URL } from '../../config';
import { Link } from 'react-router-dom';
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/loginSlice';
import {
    showLoginModal,
    showSignupModal,
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

    const handleLogout = () => {
        axios.post(`${REACT_APP_API_URL}/sign/out`,
            {
                accessToken: accessToken
            })
            .then((result) => {
                dispatch(inputModalText(result.message));
                dispatch(changeModalImg('check_man'));
                dispatch(showConfirmModal(true));
                dispatch(logout());
            })
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
                        <NavLink to="/mypage">
                            <NavButton>마이페이지</NavButton>
                        </NavLink>
                        <NavButton onClick={handleLogout}>Logout</NavButton>
                    </NavButtons>
                </>
            ) : (
                <>
                    <NavButtons>
                        <NavButton onClick={() => dispatch(showSignupModal(true))}>회원가입</NavButton>
                        <NavButton onClick={() => dispatch(showLoginModal(true))}>Login</NavButton>
                    </NavButtons>
                </>
            )}
        </NavContainer>
    )
}

export default Header;