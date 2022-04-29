import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ModalBackground, ModalContainer, ModalText, LoginInput } from './styled'

function Login() {

    return (
        <>
            {/* onClick시 모달창 닫히게끔 모달창 띄우는 상태가 리덕스로 관리 필요 */}
            <ModalBackground>
                <ModalContainer>
                    <ModalText>
                        <span>&times;</span>
                        <h2>로그인</h2>
                        <p>회원이 아니신가요?
                            {/* signup 모달창으로 변경하도록 해당 상태 관리 필요 */}
                            <button>회원가입하기</button>
                        </p>
                    </ModalText>
                    <LoginInput>

                    </LoginInput>
                </ModalContainer>
            </ModalBackground>
        </>
    )
}
export default Login;