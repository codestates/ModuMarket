import React ,{useState} from 'react';
import Cards from '../../components/Cards/Cards'
import {dummyData} from '../../assets/dummy'
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


function BoardPage() {

    const [cardInfo, setCardInfo] = useState(dummyData.cardInfo)

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
                    <ReservationButtonWrap>
                        <ReservationButton>공구글 등록하기</ReservationButton>
                    </ReservationButtonWrap>
                    <CardWrap>
                        {cardInfo.map((info, idx) => <Cards info={info} key ={idx}/>)}
                    </CardWrap>
                </Wrap>
            </Section>
        </div>
        
    )
}
export default BoardPage;