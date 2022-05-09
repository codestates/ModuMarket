import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirmModal, showChattingModal } from '../../../reducers/modalSlice'
import { ModalBackground, ModalContainer, ModalText, ModalImg, ModalButton } from './styled';


const Chatting = () => {

   
    const dispatch = useDispatch();

    return (
        <>
            <ModalBackground onClick={() => dispatch(showChattingModal(false))} />
            <ModalContainer>

                
                <ModalText>
                    <span onClick={() => dispatch(showChattingModal(false))}>&times;</span>
                    <p></p>
                </ModalText>
                
                        <ModalButton onClick={() => dispatch(showChattingModal(false))}>확인</ModalButton>
                
            </ModalContainer>
        </>


    )
}

export default Chatting