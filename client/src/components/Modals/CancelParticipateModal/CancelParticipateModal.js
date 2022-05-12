import { useDispatch, useSelector } from 'react-redux';
import { showCancelParticipateModal, inputModalText, changeModalImg, showConfirmModal } from '../../../reducers/modalSlice';
import question from '../../../assets/question.png';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config';
import {
    ModalBackground, ModalContainer, 
    ModalText, ModalImg, 
    ModalButton,ModalButtonWrap } from '../DeleteModal/styled';


function CancelParticipateModal (){
    
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const cardInfo = useSelector((state) => state.board.cardInfo);

    async function handleJoin () {
        const result  = await axios({
            url : `${ REACT_APP_API_URL }/post/${cardInfo._id}/cancel`,
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
            dispatch(showCancelParticipateModal(false))
            dispatch(showConfirmModal(true));
            
        })
    }
    
    
    return (
        <ModalBackground>
            <ModalContainer>
                <ModalImg>
                    <img src = {question} alt="confirm photo"/>
                </ModalImg>
                <ModalText>
                    <p>공구참여 취소할까요?</p>
                </ModalText>
                <ModalButtonWrap>
                    <ModalButton background="#FF6767" onClick={() => handleJoin()} >취소할래요</ModalButton>  
                    <ModalButton onClick={() => dispatch(showCancelParticipateModal(false))}>아니오</ModalButton>   
                </ModalButtonWrap>
            </ModalContainer>
        </ModalBackground>
    )
}

export default CancelParticipateModal