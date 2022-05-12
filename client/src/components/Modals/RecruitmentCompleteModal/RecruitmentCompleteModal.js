import { useDispatch, useSelector } from 'react-redux';
import { showRecruitmentCompleteModal, inputModalText, changeModalImg, showConfirmModal } from '../../../reducers/modalSlice';
import question from '../../../assets/question.png';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config'
import {
        ModalBackground, ModalContainer, 
        ModalText, ModalImg, 
        ModalButton,ModalButtonWrap } from '../DeleteModal/styled';

function RecruitmentCompleteModal () {
    const dispatch = useDispatch();
    const cardInfo = useSelector((state) => state.board.cardInfo);
    const accessToken = useSelector((state) => state.login.accessToken);
    async function handleComplete (){

        await axios({
            url : `${ REACT_APP_API_URL }/post/${cardInfo._id}/apply`,
            method : 'PATCH',
            data : {
                isvalid: false,
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
            dispatch(showRecruitmentCompleteModal(false));
            dispatch(showConfirmModal(true));
            window.location.reload();
        })
    }

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalImg>
                    <img src = {question} alt="confirm photo"/>
                </ModalImg>
                <ModalText>
                    <p>현재 공고글 모집을 완료할까요?</p>
                </ModalText>
                <ModalButtonWrap>
                    <ModalButton background="#FF6767" onClick={() => handleComplete()} >모집완료</ModalButton>  
                    <ModalButton onClick={() => dispatch(showRecruitmentCompleteModal(false))}>아니오</ModalButton>   
                </ModalButtonWrap>
            </ModalContainer>
        </ModalBackground>
    )
}

export default RecruitmentCompleteModal