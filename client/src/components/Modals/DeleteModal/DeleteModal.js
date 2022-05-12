import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config';
import question from '../../../assets/question.png';
import skull from '../../../assets/skull_icon.png';
import { 
        showConfirmModalToBoard, showDeleteModal, 
        inputModalText, changeModalImg } from '../../../reducers/modalSlice';
import {ModalBackground, ModalContainer,
        ModalImg,ModalText, ModalButton,
        ModalButtonWrap, ModalSkullButton,
        ModalSkullImg, } from './styled'

function DeleteModal () {
    const dispatch = useDispatch();
    const cardInfo = useSelector((state) => state.board.cardInfo);
    const accessToken = useSelector((state) => state.login.accessToken);



    async function handleDelete(){
        await axios({
            url : `${ REACT_APP_API_URL }/post/${cardInfo._id}`,
            method : "DELETE",
            headers : {
                'Content-Type': "application/json",
                authorization : `Bearer ${accessToken}` 
            },
            withCredentials : true
        }).then((result) => {
            dispatch(inputModalText(result.data.message));
            dispatch(changeModalImg('check_man'));
            dispatch(showDeleteModal(false));
            dispatch(showConfirmModalToBoard(true));
        })

    }

    return (
        <ModalBackground>
            <ModalContainer>
                {
                    cardInfo.member_num/cardInfo.member_min >= 1
                    ? (
                        <>
                            <ModalSkullImg>
                                <img src = {skull} alt="unable delete photo"/>
                                <ModalText>
                                <span>참가 최소 인원이 달성되어 삭제가 불가합니다.</span>
                                </ModalText>
                                <ModalSkullButton onClick={() => dispatch(showDeleteModal(false))}>확인</ModalSkullButton>
                            </ModalSkullImg>
                        </>
                    )

                    :(
                        <>
                            <ModalImg>
                                <img src = {question} alt="confirm photo"/>
                            </ModalImg>
                            <ModalText>
                                <p>현재 공고글을 삭제할까요?</p>
                            </ModalText>
                            <ModalButtonWrap>
                                <ModalButton background="#FF6767" onClick={() => handleDelete()} >삭제</ModalButton>  
                                <ModalButton onClick={() => dispatch(showDeleteModal(false))}>아니오</ModalButton>   
                            </ModalButtonWrap>
                        </>
                    )
                }
                
            </ModalContainer>
        </ModalBackground>
    )
}

export default DeleteModal