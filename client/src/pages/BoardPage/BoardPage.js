import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { showRegisterModal, showLoginConfirmModal } from '../../reducers/modalSlice';
import { REACT_APP_API_URL } from '../../config'
import notYet from '../../assets/no_data_not_yet.gif'
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
    CardWrap,
    RegisterNotYet,
    RegisterNotYetPhoto
} from "./styled"


function BoardPage() {

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.login.accessToken);
    const isLogin = useSelector((state) => state.login.isLogin);
    const areaName = useSelector((state) => state.userInfo.userInfo.area_name);
    const [cardInfo, setCardInfo] = useState()
    const [resultInfo, setResultInfo] = useState()
    const [searchInfo, setSearchInfo] = useState({
        title: "", 
        category: 5,
    })
    const handleInputValue = (key) => (e) => { // onChange 가 발생할 경우 값을 넣어주는 함수
        setSearchInfo({ ...searchInfo, [key]: e.target.value });
    };

    async function handleCardInfo() {
        const result = await axios({
            url: `${REACT_APP_API_URL}/post`,
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization : `Bearer ${accessToken}` 
            },
            withCredentials: true
        })
        
        setResultInfo(result.data.data)
        setCardInfo(result.data.data)
    }

    useEffect(() => {
        handleCardInfo()
    },[])

    function handleSearch () {

        if(searchInfo.title === "" && parseInt(searchInfo.category) === 5){
            return setCardInfo(resultInfo)
        }
        if(searchInfo.title !== "" && parseInt(searchInfo.category) === 5) {
            let filteringInfo = resultInfo.filter((info) => {
                return info.title.includes(searchInfo.title)
            })
            return setCardInfo(filteringInfo)
        }
        if(searchInfo.title === "" && parseInt(searchInfo.category) !== 5){
            let filteringInfo = resultInfo.filter((info) => {
                return info.category === parseInt(searchInfo.category)
            })
            return setCardInfo(filteringInfo)
        }
        else{
            let filteringInfo = resultInfo.filter((info) => {
                return info.title.includes(searchInfo.title) && (info.category === parseInt(searchInfo.category))
            })
            return setCardInfo(filteringInfo)
        }
    }



    return (
        <div>
            <Section>
                <Wrap>
                    {
                        isLogin 
                        ?
                            <TitleWrap>{`${areaName} 공구찾기`}</TitleWrap>
                        :
                            <TitleWrap>전체 공구찾기</TitleWrap>
                    }
                    <SearchWrap>
                        <SearchTab type="text" onChange={handleInputValue("title")}></SearchTab>
                        <SearchCategory onChange={handleInputValue("category")}>
                            <option value={5}>전체</option>
                            <option value={0}>패션, 뷰티</option>
                            <option value={1}>식품</option>
                            <option value={2}>생필품</option>
                            <option value={3}>취미, 반려</option>
                            <option value={4}>유아동</option>
                        </SearchCategory>
                        <SearchButton onClick={() => handleSearch()}>검색</SearchButton>
                    </SearchWrap>
                    {
                        isLogin 
                        ?   
                            <ReservationButtonWrap>
                                <ReservationButton onClick={() => dispatch(showRegisterModal(true))}>공구글 등록하기</ReservationButton>
                            </ReservationButtonWrap>
                        :
                            <ReservationButtonWrap>
                                <ReservationButton onClick={() => dispatch(showLoginConfirmModal(true))}>공구글 등록하기</ReservationButton>
                            </ReservationButtonWrap>
                    }
                    <CardWrap>
                        {
                            cardInfo 
                            ? 
                                cardInfo.length === 0
                                    ?
                                        <RegisterNotYet>
                                            <RegisterNotYetPhoto>
                                                <img src={notYet} alt="has no data not yet photo"/>
                                            </RegisterNotYetPhoto>
                                            <p>아직 우리동네에 등록된 공구가 없어요</p>
                                        </RegisterNotYet>
                                    :
                                        cardInfo.map((info, idx) => <Cards info={info} key={idx} />)
                            :   
                                <div>Loading</div>
                        }
                    </CardWrap>
                </Wrap>
            </Section>
        </div>

    )
}
export default BoardPage;