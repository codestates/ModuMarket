import React from 'react';
import FoodIcon from '../../../assets/food_icon.png'
import BabiesIcon from '../../../assets/babies_icon.png'
import FashionIcon from '../../../assets/fashion_icon.png'
import HobbiesIcon from '../../../assets/hobbies_icon.png'
import NecessityIcon from '../../../assets/necessity_icon.png'
import MemberIcon from '../../../assets/member.png'
import TimerIcon from '../../../assets/timer.png'
import Photo from '../../../assets/photo.png'
import { useDispatch, useSelector } from 'react-redux';
import {
    showChattingModal,
    showReviseRegisterModal,
    showDeleteModal,
    showLoginConfirmModal,
    showRecruitmentCompleteModal,
    showCancelParticipateModal,
    showParticipateModal
} from '../../../reducers/modalSlice';
import { REACT_APP_API_URL } from '../../../config'
import {
    Section, Wrap,
    TitleWrap, Title,
    ButtonWrap, Button,
    SectionWrap, HeadButton,
    DetailWrap, Detail,
    DetailPhoto, DetailCategory,
    DetailMemberAndTimeWrap,
    DetailMemberAndTime,
    DetailButtonWrap, DetailButton,
    DitailButtonChild
} from './styled';

function DetailSection({ info }) {
    const dispatch = useDispatch();
    const cardUserId = info.data.userId._id
    const isValid = info.data.isvalid
    const isApplied = useSelector((state) => state.board.isApplied)
    const userId = useSelector((state) => state.userInfo.userInfo.id);
    const isLogin = useSelector((state) => state.login.isLogin);
    
    const category = ["패션, 뷰티","식품","생필품","취미, 반려","유아동"];
        let categoryNumber = info.data.category;
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


    function handleLogin() {
        dispatch(showLoginConfirmModal(true))
    }

    return (
        <Section>
            <Wrap>
                <TitleWrap>
                    <Title>
                        <h2>{info.data.title}</h2>
                    </Title>
                    {
                        cardUserId === userId
                            ?
                            <ButtonWrap>
                                <Button>
                                    <HeadButton background="#FF6767" onClick={() => { handleRevise() }}>수정하기</HeadButton>
                                </Button>
                                <Button>
                                    <HeadButton background="white" onClick={() => { handleDelete() }}>삭제하기</HeadButton>
                                </Button>
                            </ButtonWrap>
                            : null
                    }
                </TitleWrap>
            </Wrap>
            <SectionWrap>
                <DetailWrap>
                    {
                        info.data.image === undefined
                            ? <DetailPhoto image = ""><img src= {Photo} alt="Card Detail"/></DetailPhoto> 
                            : <DetailPhoto><img src = {`${ REACT_APP_API_URL }/post/image/${info.data.image}/`} alt="Card Detail"/></DetailPhoto> 
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
                            <span>{info.data.member_num} / {info.data.member_min}</span>
                        </DetailMemberAndTimeWrap>
                        <DetailMemberAndTimeWrap>
                            <DetailMemberAndTime>
                                <img src={TimerIcon} alt="Card Timer Icon" />
                                <span>종료일</span>
                            </DetailMemberAndTime>
                            <span>{info.data.endtime}</span>
                        </DetailMemberAndTimeWrap>
                        <DetailButtonWrap>
                            <DetailButton>
                                <DitailButtonChild background="#FF6767" onClick={() => dispatch(showChattingModal(true))} >채팅하기</DitailButtonChild>
                            </DetailButton>
                            {
                                isValid
                                    ?
                                    isLogin
                                        ?
                                        cardUserId === userId
                                            ?
                                            <DetailButton>
                                                <DitailButtonChild background="white" onClick={() => dispatch(showRecruitmentCompleteModal(true))}>모집 완료하기</DitailButtonChild>
                                            </DetailButton>
                                            :
                                            isApplied
                                                ?
                                                <DetailButton>
                                                    <DitailButtonChild  background="white" onClick={() => dispatch(showCancelParticipateModal(true))}>참가 취소하기</DitailButtonChild>
                                                </DetailButton>
                                                :
                                                <DetailButton>
                                                    <DitailButtonChild  background="white" onClick={() => dispatch(showParticipateModal(true))}>참가하기</DitailButtonChild>
                                                </DetailButton>
                                        :
                                        <DetailButton>
                                            <DitailButtonChild background="white" onClick={() => { handleLogin() }}>공구 참여하기</DitailButtonChild>
                                        </DetailButton>
                                    :
                                    <DetailButton>
                                        <DitailButtonChild  background="white">모집 완료되었습니다</DitailButtonChild>
                                    </DetailButton>
                            }
                        </DetailButtonWrap>
                    </Detail>
                </DetailWrap>
            </SectionWrap>
        </Section>
    )
}

export default DetailSection;