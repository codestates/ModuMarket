import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAlertModal } from '../../../reducers/modalSlice';
import {
    ModalText, ModalButton,
    ModalButtonWrap } from '../DeleteModal/styled'
import {ModalContainer, ModalForm, ModalImg } from './styled';
import thinking from '../../../assets/thinking.png'
const AlertModal = () => {

    const dispatch = useDispatch();

    return (
        <ModalContainer>
            <ModalImg>
                <img src={thinking} alt="it must fill the inputbox" />
                <ModalText>
                    <ModalForm>
                        <p>사진을 제외한 모든 항목을 적어주세요.</p>
                    </ModalForm> 
                </ModalText>
                <ModalButtonWrap>
                    <ModalButton background="#FF6767" onClick={() => {dispatch(showAlertModal(false))}}>확인</ModalButton>
                </ModalButtonWrap>
            </ModalImg>
        </ModalContainer>
    )
}

export default AlertModal