import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirmModal } from '../../../reducers/modalSlice';
import {
    ModalBackground, ModalContainer,
    ModalText, ModalButton,
    ModalImg,ModalButtonWrap } from '../DeleteModal/styled'
import { confirmImg } from '../../../assets/images'
import { ModalForm } from './styled';

const Confirm = () => {

    const img = useSelector((state) => state.modal.modalImg);
    const text = useSelector((state) => state.modal.modalInformText);
    const dispatch = useDispatch();

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalImg>
                    <img src={confirmImg[`${img}`]} alt={`${img}`} />
                    <ModalText>
                        <ModalForm>
                            <p>{text}</p>
                        </ModalForm> 
                    </ModalText>
                    <ModalButtonWrap>
                        <ModalButton background="#FF6767" onClick={() => {dispatch(showConfirmModal(false)); window.location.reload();}}>확인</ModalButton>
                    </ModalButtonWrap>
                </ModalImg>
            </ModalContainer>
        </ModalBackground>
    )
}

export default Confirm