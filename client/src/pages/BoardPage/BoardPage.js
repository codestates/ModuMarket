import React ,{useState, useEffect} from 'react';
import Cards from '../../components/Cards/Cards'
import Datepicker from '../../components/Modals/Register/Register'
import {dummyData} from '../../assets/dummy'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { showRegisterModal } from '../../reducers/modalSlice';
import { REACT_APP_API_URL } from '../../config'
import {
    Section,
    Wrap,
    TitleWrap,
    SearchWrap,
    SearchTab,
    SearchButton,
    SearchCategory,
    ReservationButtonWrap,
    ReservationButton,
    CardWrap
    } from "./styled"


function BoardPage () {

    const dispatch = useDispatch();
    const [cardInfo, setCardInfo] = useState()
    
    async function handleCardInfo(){
        const result = await axios({
            url : `${REACT_APP_API_URL}/post`,
            method: 'GET',
            headers : {
                "Content-Type": "application/json",
                //authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZmOTk2YWYxOTg1OGQwZTZiNGVhYWQiLCJlbWFpbCI6IjIiLCJhcmVhX25hbWUiOiLshJzsmrgiLCJpYXQiOjE2NTE1MDk4MjIsImV4cCI6MTY1MTUxNzAyMn0.ALBw2B7lGDBpS-P6k-REKoYUs227u8zh15cGVvnDAqg`,
            },
            withCredentials : true
        })
        //console.log(result)
        setCardInfo(result.data.data)

    }
    
    useEffect(()=> {
        handleCardInfo()
    },[])

    return (
        <div>
            <Section>
                <Wrap>
                    <TitleWrap>망원동 공구찾기</TitleWrap>
                    <SearchWrap>
                        <SearchTab type="text"></SearchTab>
                        <SearchCategory>
                            <option value="0">패션, 뷰티</option>
                            <option value="1">식품</option>
                            <option value="2">생필품</option>
                            <option value="3">취미, 반려</option>
                            <option value="4">유아동</option>
                        </SearchCategory>
                        <SearchButton>검색</SearchButton>
                    </SearchWrap>
                    {/* 로그인을 했을 경우에 아래의 모달창이 뜰 수 있도록 하고 로그인이 안되어있다면 로그인 페이지로 가게해야한다. */}
                    <ReservationButtonWrap>
                        <ReservationButton onClick ={() => dispatch(showRegisterModal(true))}>공구글 등록하기</ReservationButton>
                    </ReservationButtonWrap>
                    <CardWrap>
                        {
                            cardInfo ? cardInfo.map((info, idx) => <Cards info={info} key ={idx}/>)
                                     : <div>Loading</div>
                        }
                    </CardWrap>
                </Wrap>
            </Section>
        </div>
        
    )
}
export default BoardPage;