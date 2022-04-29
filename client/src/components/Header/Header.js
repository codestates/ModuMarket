import { Link } from 'react-router-dom';
import { React, useState } from 'react'
import { NavLink, NavContainer, NavButtons, NavButton, NavBoard } from './style'

function Header({ }) {

    const [isLogin, setIsLogin] = useState(false);
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
                </>
            ) : (
                <>
                    <NavButtons>
                        <NavLink to="/signup">
                            <NavButton>회원가입</NavButton>
                        </NavLink>
                        <NavLink to="/login">
                            <NavButton>Login</NavButton>
                        </NavLink>
                    </NavButtons>
                </>
            )}
        </NavContainer>
    )
}

export default Header;