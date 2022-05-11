import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { REACT_APP_API_URL } from '../../../config'
import question from '../../../assets/question.png'
import { 
        showConfirmModal, showDeleteModal, 
        inputModalText, changeModalImg } from '../../../reducers/modalSlice';
import {ModalBackground, ModalContainer,
        ModalImg,ModalText, ModalButton,
        ModalButtonWrap} from './styled'

function DeleteModal () {
    const dispatch = useDispatch();
    const cardInfo = useSelector((state) => state.board.cardInfo);

    return (
        <ModalBackground>
            <ModalContainer>
                {
                    cardInfo.member_num/cardInfo.member_min >= 1
                    ? (
                        <>
                            <ModalImg>
                                
                            </ModalImg>
                            <ModalText>
                              
                            </ModalText>
                            <ModalButton>

                            </ModalButton>
                        </>
                    )

                    :(
                        <>
                            <ModalImg>
                                <img src = {question}/>
                            </ModalImg>
                            <ModalText>
                                <p>현재 공고글을 삭제할까요?</p>
                            </ModalText>
                            <ModalButtonWrap>
                                <ModalButton background="#FF6767" >삭제</ModalButton>  
                                <ModalButton>아니오</ModalButton>   
                            </ModalButtonWrap>
                        </>
                    )
                }
                
            </ModalContainer>
        </ModalBackground>
    )
}

export default DeleteModal