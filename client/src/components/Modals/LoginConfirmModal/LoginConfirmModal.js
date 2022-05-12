import { useDispatch } from 'react-redux';
import { showLoginConfirmModal, showSignupModal, showLoginModal } from '../../../reducers/modalSlice';
import question from '../../../assets/question.png';
import {
    ModalBackground, ModalContainer,
    ModalText, ModalButton,
    ModalImg,ModalButtonWrap } from '../DeleteModal/styled'



function LoginConfirmModal (){

    const dispatch = useDispatch();

    return (
        <ModalBackground>
            <ModalContainer>
                <p onClick={() => dispatch(showLoginConfirmModal(false))}>&times;</p>
                 <ModalImg>
                    <img src = {question} alt="require login img"/>
                    <ModalText>
                        <p>로그인이 필요해요</p>
                    </ModalText>
                    <ModalText>
                        <p>회원이 아니신가요?</p> 
                        <a onClick={()=>{dispatch(showSignupModal(true)); dispatch(showLoginConfirmModal(false));}}>회원가입하기</a>
                    </ModalText>
                    <ModalButtonWrap>
                        <ModalButton background="#FF6767" onClick={() => {dispatch(showLoginModal(true)); dispatch(showLoginConfirmModal(false));}}>확인</ModalButton>
                    </ModalButtonWrap>
                </ModalImg>
            </ModalContainer>
        </ModalBackground>
    )

}

export default LoginConfirmModal;