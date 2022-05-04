import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoginModal, showSignupModal } from '../../../reducers/modalSlice';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
function Register(){

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())


    return (
        <>
            <DatePicker 
                selected={startDate} onChange ={date => setStartDate(date)}
                selectsStart startDate={startDate} endDate={endDate}/>

            <DatePicker 
                selected={endDate} onChange ={date => setEndDate(date)}
                selectEnd startDate={startDate} endDate={endDate} minDate={startDate}/>
        </>
    )
}

export default Register;