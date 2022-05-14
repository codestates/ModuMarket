import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showConfirmModalToBoard } from '../../../reducers/modalSlice';
import { confirmImg } from '../../../assets/images'
import {
        ModalBackground, ModalContainer,
        ModalText, ModalButton,
        ModalImg,ModalButtonWrap } from '../DeleteModal/styled'
import {ModalForm} from './styled'


const ConfirmModalToBoard = () => {

    const img = useSelector((state) => state.modal.modalImg);
    const text = useSelector((state) => state.modal.modalInformText);
    const dispatch = useDispatch();

    return (
        <>
        <ModalBackground/>
            <ModalContainer>
                <ModalImg>
                    <img src={confirmImg[`${img}`]} alt={`${img}`} />
                    <ModalText>
                        <ModalForm>
                            <p>{text}</p>
                        </ModalForm> 
                    </ModalText>
                    <ModalButtonWrap>
                        <ModalButton background="#FF6767" onClick={() => {dispatch(showConfirmModalToBoard(false)); setTimeout (() => {window.location.replace("/board")}, 50)}}>확인</ModalButton>
                    </ModalButtonWrap>
                </ModalImg>
            </ModalContainer>
        </>
    )
}

export default ConfirmModalToBoard