import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    showMyNewPwModal,
    showConfirmModal,
    inputModalText,
    changeModalImg
} from '../../../reducers/modalSlice';
import {
    ModalBackground,
    ModalContainer,
    ModalText,
    SignupInput,
    ModalButton
} from '../styled'
import axios from 'axios'
import { REACT_APP_API_URL, REDIRECT_URI } from '../../../config';

const PwInput = () => {

}

export default PwInput;