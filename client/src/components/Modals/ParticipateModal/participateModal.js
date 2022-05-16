import { useDispatch, useSelector } from 'react-redux';
import { showParticipateModal, inputModalText, changeModalImg, showConfirmReloadModal } from '../../../reducers/modalSlice';
import question from '../../../assets/question.png';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config';
import {
    ModalBackground, ModalContainer, 
    ModalText, ModalImg, 
    ModalButton,ModalButtonWrap } from '../DeleteModal/styled';


function ParticipateModal (){
    
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const cardInfo = useSelector((state) => state.board.cardInfo);

    async function handleJoin () {
        await axios({
            url : `${ REACT_APP_API_URL }/post/${cardInfo._id}/apply`,
            method : 'PATCH',
            data : {
                _id : cardInfo._id
            },
            headers : {
                'Content-Type': "application/json",
                authorization : `Bearer ${accessToken}` 
            },
            withCredentials : true
        }).then((result) =>{
            dispatch(inputModalText(result.data.message));
            dispatch(changeModalImg('check_man'));
            dispatch(showParticipateModal(false));
            dispatch(showConfirmReloadModal(true));
        })
    }
    
    
    return (
        <ModalBackground>
            <ModalContainer>
                <ModalImg>
                    <img src = {question} alt="confirm photo"/>
                </ModalImg>
                <ModalText>
                    <p>공구에 참가하실래요?</p>
                </ModalText>
                <ModalButtonWrap>
                    <ModalButton background="#FF6767" onClick={() => handleJoin()} >참가할래요</ModalButton>  
                    <ModalButton onClick={() => dispatch(showParticipateModal(false))}>아니오</ModalButton>   
                </ModalButtonWrap>
            </ModalContainer>
        </ModalBackground>
    )
}

export default ParticipateModal