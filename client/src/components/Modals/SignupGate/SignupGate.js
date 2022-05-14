import { useDispatch } from 'react-redux';
import {
    showLoginModal,
    showSignupModal,
    showSignupGateModal,
} from '../../../reducers/modalSlice';
import { setUserStatus } from '../../../reducers/userInfoSlice';
import { ModalBackground,ModalTextWrap,
    ModalContainer,ModalTitleText,
    ModalButton,ButtonWrap,
    XWrap,Wrap, ModalTitleWrap} from './styled'
import { REDIRECT_URI } from '../../../config';
import gitIcon from '../../../assets/github_icon_dark.png'
import kakaoIcon from '../../../assets/kakao.png'

const SignupGate = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_KEY}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}`
    const dispatch = useDispatch();

    return (
        <>
            <ModalBackground onClick={() => dispatch(showSignupGateModal(false))} />
            <ModalContainer>
                <XWrap>
                    <span onClick={() => dispatch(showSignupGateModal(false))}>&times;</span>
                </XWrap>
                <Wrap>
                    <ModalTextWrap>
                        <ModalTitleWrap>
                            <h2>회원가입</h2>
                            <ModalTitleText>
                                <p>이미 회원이신가요?</p>
                                    {/* Login 모달창으로 변경하도록 해당 상태 관리*/}
                                <a onClick={() => {
                                    dispatch(showSignupGateModal(false))
                                    dispatch(showLoginModal(true))
                                }}>로그인 하기</a>
                            </ModalTitleText>
                        </ModalTitleWrap>
                    </ModalTextWrap>
                <ButtonWrap>
                    <ModalButton background="#FF6767" onClick={() => {
                        dispatch(showSignupModal(true))
                        dispatch(showSignupGateModal(false))
                    }}>
                        회원가입
                    </ModalButton>
                    <ModalButton background="white" onClick={() => {
                    window.location.href = `${GITHUB_AUTH_URL}`
                    dispatch(showSignupGateModal(false))
                    dispatch(setUserStatus('github'))
                    }}>
                        <img src={gitIcon}/>
                        Github으로 회원가입
                    </ModalButton>
                    <ModalButton background="#F7E600" onClick={() => {
                        window.location.href = `${KAKAO_AUTH_URL}`
                        dispatch(showSignupGateModal(false))
                        dispatch(setUserStatus('kakao'))
                    }}>
                        <img src={kakaoIcon}/>
                        카카오로 회원가입
                    </ModalButton>
                </ButtonWrap>
                </Wrap>
            </ModalContainer>
        </>
    )
}

export default SignupGate;