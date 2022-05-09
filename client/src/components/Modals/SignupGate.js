import { useSelector, useDispatch } from 'react-redux';
import {
    showLoginModal,
    showSignupModal,
    showSignupSocialModal,
    showSignupGateModal,
} from '../../reducers/modalSlice';
import { setUserStatus } from '../../reducers/userInfoSlice';
import { ModalBackground, ModalContainer, ModalText, ModalButton } from './styled'
import { REDIRECT_URI } from '../../config';

const SignupGate = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const dispatch = useDispatch();

    return (
        <>
            <ModalBackground onClick={() => dispatch(showSignupGateModal(false))} />
            <ModalContainer>
                <ModalText>
                    <span onClick={() => dispatch(showSignupGateModal(false))}>&times;</span>
                    <h2>회원가입</h2>
                    <p>이미 회원이신가요?
                        {/* Login 모달창으로 변경하도록 해당 상태 관리*/}
                        <button onClick={() => {
                            dispatch(showSignupGateModal(false))
                            dispatch(showLoginModal(true))
                        }}>로그인 하기</button>
                    </p>
                </ModalText>
                <ModalButton onClick={() => {
                    dispatch(showSignupModal(true))
                    dispatch(showSignupGateModal(false))
                }}>
                    회원가입
                </ModalButton>
                <ModalButton onClick={() => {
                    window.location.href = `${KAKAO_AUTH_URL}`
                    dispatch(showSignupGateModal(false))
                    dispatch(setUserStatus('kakao'))
                }}>
                    카카오로 회원가입
                </ModalButton>
                <ModalButton onClick={() => {
                    dispatch(showSignupSocialModal(true))
                    dispatch(showSignupGateModal(false))
                    dispatch(setUserStatus('github'))
                }}>
                    Github으로 회원가입
                </ModalButton>
            </ModalContainer>
        </>
    )
}

export default SignupGate;