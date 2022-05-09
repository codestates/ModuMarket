import React ,{useState} from 'react';
import {dummyData} from "../../../assets/dummy"
import FoodIcon from '../../../assets/food_icon.png'
import BabiesIcon from '../../../assets/babies_icon.png'
import FashionIcon from '../../../assets/fashion_icon.png'
import HobbiesIcon from '../../../assets/hobbies_icon.png'
import NecessityIcon from '../../../assets/necessity_icon.png'
import MemberIcon from '../../../assets/member.png'
import TimerIcon from '../../../assets/timer.png'
import Photo from '../../../assets/photo.png'
import { useDispatch, useSelector } from 'react-redux';
import { showChattingModal } from '../../../reducers/modalSlice';
import {Section, Wrap, 
        TitleWrap, Title, 
        ButtonWrap, Button,
        SectionWrap, 
        DetailWrap, Detail, 
        DetailPhoto,DetailCategory, 
        DetailMemberAndTimeWrap, 
        DetailMemberAndTime, 
        DetailButtonWrap, DetailButton } from './styled';

function DetailSection ({info}){
    
    //console.log(info)
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.login.isLogin);
    const category = ["패션, 뷰티","식품","생필품","취미, 반려","유아동"];
        let categoryNumber = info.category;
        let categoryImg;

        if(category[categoryNumber] === "패션, 뷰티"){
            categoryImg = FashionIcon;
        }
        if(category[categoryNumber] === "식품"){
            categoryImg = FoodIcon;
        }
        if(category[categoryNumber] === "생필품"){
            categoryImg = NecessityIcon;
        }
        if(category[categoryNumber] === "취미, 반려"){
            categoryImg = HobbiesIcon;
        }
        if(category[categoryNumber] === "유아동"){
            categoryImg = BabiesIcon;
        }


        function handleDelete () {
            
        }

    return (
        <Section>
            <Wrap>
                <TitleWrap>
                    <Title>
                        <h2>{info.title}</h2>
                    </Title>
                    <ButtonWrap>
                        
                        <Button background="#FF6767">
                            <button>수정하기</button>
                        </Button>
                        <Button background="white">
                            <button>삭제하기</button>
                        </Button>
                    </ButtonWrap>
                </TitleWrap>
            </Wrap>
            <SectionWrap>
                <DetailWrap>
                            {
                                info.image === ""
                                    ? <DetailPhoto image = ""><img src= {Photo} art ="Card Detail Photo"/></DetailPhoto> 
                                    : <DetailPhoto><img src= {info.image} art ="Card Detail Photo"/></DetailPhoto> 
                            }
                        <Detail>
                            <DetailCategory>
                            <img src ={categoryImg} alt='category icon'/>
                            <span>{category[categoryNumber]}</span>
                            </DetailCategory>
                            <DetailMemberAndTimeWrap>
                                <DetailMemberAndTime>
                                    <img src = {MemberIcon} art = "Card Member Icon"/>
                                    <span>참가인원</span>
                                </DetailMemberAndTime>
                                <span>{info.member_num} / {info.member_min}</span>
                            </DetailMemberAndTimeWrap>
                            <DetailMemberAndTimeWrap>
                                <DetailMemberAndTime>
                                    <img src = {TimerIcon} art = "Card Timer Icon"/>
                                    <span>종료일</span>
                                </DetailMemberAndTime>
                                <span>{info.endtime}</span>
                            </DetailMemberAndTimeWrap>
                            <DetailButtonWrap>
                                <DetailButton background="#FF6767">
                                    <button onClick ={() => dispatch(showChattingModal(true))} >채팅하기</button>
                                </DetailButton>
                                <DetailButton background="white">
                                    <button>모집 완료하기</button>
                                </DetailButton>
                            </DetailButtonWrap>
                        </Detail>
                    </DetailWrap>
            </SectionWrap>
        </Section>
    )
}

export default DetailSection;