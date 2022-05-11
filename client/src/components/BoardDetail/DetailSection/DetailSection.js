import React, { useState } from 'react';
import FoodIcon from '../../../assets/food_icon.png'
import BabiesIcon from '../../../assets/babies_icon.png'
import FashionIcon from '../../../assets/fashion_icon.png'
import HobbiesIcon from '../../../assets/hobbies_icon.png'
import NecessityIcon from '../../../assets/necessity_icon.png'
import MemberIcon from '../../../assets/member.png'
import TimerIcon from '../../../assets/timer.png'
import Photo from '../../../assets/photo.png'
import ReviseRegister from '../../Modals/ReviseRegister/ReviseRegister'
import { useDispatch, useSelector } from 'react-redux';
import { showChattingModal, showReviseRegisterModal, showDeleteModal } from '../../../reducers/modalSlice';
import { REACT_APP_API_URL } from '../../../config'
import {
    Section, Wrap,
    TitleWrap, Title,
    ButtonWrap, Button,
    SectionWrap,
    DetailWrap, Detail,
    DetailPhoto, DetailCategory,
    DetailMemberAndTimeWrap,
    DetailMemberAndTime,
    DetailButtonWrap, DetailButton
} from './styled';

function DetailSection({ info }) {

    const cardUserId = info.userId.id
    const userId = useSelector((state) => state.userInfo.userInfo.id);
    const dispatch = useDispatch();

    const category = ["패션, 뷰티", "식품", "생필품", "취미, 반려", "유아동"];
    let categoryNumber = info.category;
    let categoryImg;

    if (category[categoryNumber] === "패션, 뷰티") {
        categoryImg = FashionIcon;
    }
    if (category[categoryNumber] === "식품") {
        categoryImg = FoodIcon;
    }
    if (category[categoryNumber] === "생필품") {
        categoryImg = NecessityIcon;
    }
    if (category[categoryNumber] === "취미, 반려") {
        categoryImg = HobbiesIcon;
    }
    if (category[categoryNumber] === "유아동") {
        categoryImg = BabiesIcon;
    }


    function handleDelete() {
        dispatch(showDeleteModal(true))
    }

    function handleRevise() {

        dispatch(showReviseRegisterModal(true))
    }

    return (
        <Section>
            <Wrap>
                <TitleWrap>
                    <Title>
                        <h2>{info.title}</h2>
                    </Title>
                    {
                        cardUserId === userId
                            ?
                            <ButtonWrap>
                                <Button background="#FF6767">
                                    <button onClick={() => { handleRevise() }}>수정하기</button>
                                </Button>
                                <Button background="white">
                                    <button onClick={() => { handleDelete() }}>삭제하기</button>
                                </Button>
                            </ButtonWrap>
                            : null
                    }
                </TitleWrap>
            </Wrap>
            <SectionWrap>
                <DetailWrap>
                    {
                        info.image === undefined
                            ? <DetailPhoto image=""><img src={Photo} alt="Card Detail" /></DetailPhoto>
                            : <DetailPhoto><img src={`${REACT_APP_API_URL}/post/image/${info.image}/`} alt="Card Detail" /></DetailPhoto>
                    }
                    <Detail>
                        <DetailCategory>
                            <img src={categoryImg} alt='category icon' />
                            <span>{category[categoryNumber]}</span>
                        </DetailCategory>
                        <DetailMemberAndTimeWrap>
                            <DetailMemberAndTime>
                                <img src={MemberIcon} alt="Card Member Icon" />
                                <span>참가인원</span>
                            </DetailMemberAndTime>
                            <span>{info.member_num} / {info.member_min}</span>
                        </DetailMemberAndTimeWrap>
                        <DetailMemberAndTimeWrap>
                            <DetailMemberAndTime>
                                <img src={TimerIcon} alt="Card Timer Icon" />
                                <span>종료일</span>
                            </DetailMemberAndTime>
                            <span>{info.endtime}</span>
                        </DetailMemberAndTimeWrap>
                        <DetailButtonWrap>
                            <DetailButton background="#FF6767">
                                <button onClick={() => dispatch(showChattingModal(true))} >채팅하기</button>
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