import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirmModal } from '../../reducers/modalSlice';
import { ModalBackground, ModalContainer, ModalText, ModalImg, ModalButton } from './styled';
import { confirmImg } from '../../assets/images'


const Confirm = () => {

    const img = useSelector((state) => state.modal.modalImg);
    const text = useSelector((state) => state.modal.modalInformText);
    const dispatch = useDispatch();

    return (
        <>
            <ModalBackground onClick={() => dispatch(showConfirmModal(false))} />
            <ModalContainer>
                <ModalImg>
                    <img src={confirmImg[`${img}`]} alt={`${img}`} />
                </ModalImg>
                <ModalText>
                    <p>{text}</p>
                </ModalText>
                <ModalButton onClick={() => dispatch(showConfirmModal(false))}>확인</ModalButton>
            </ModalContainer>
        </>


    )
}

export default Confirm