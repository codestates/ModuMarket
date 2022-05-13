import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Photo from '../../assets/example_profile.jpeg';
import Cards from '../../components/Cards/Cards'
import { myPageDummyData, myPageDummyData2 } from '../../assets/dummy';
import { showMyInfoModal } from '../../reducers/modalSlice'
import {
    Section,
    Wrap,
    ProfileWrap,
    ProfilePhotoWrap,
    ProfileContentWrap,
    ProfileButtonWrap,
    ButtonWrap, Button,
    CardWrap
} from './styled'
import axios from 'axios'
import { REACT_APP_API_URL } from '../../config';

function MyPage() {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo.userInfo);
    const accessToken = useSelector((state) => state.login.accessToken);
    const [mypageInfo, setMyPageInfo] = useState(myPageDummyData.cardInfo);
    const [writeBackgroundColor, setWriteBackgroundColor] = useState("#FF6767")
    const [participateBackgroundColor, setParticipateBackgroundColor] = useState("#D9D9D9")
    function handleMyInfoChange() {

    }
    function handleParticipateBoard() {
        setMyPageInfo(myPageDummyData2.cardInfo);
        setWriteBackgroundColor("#D9D9D9")
        setParticipateBackgroundColor("#FF6767")

    }

    function handleWriteBoard() {
        setMyPageInfo(myPageDummyData.cardInfo)
        setWriteBackgroundColor("#FF6767")
        setParticipateBackgroundColor("#D9D9D9")

        axios.get(`${REACT_APP_API_URL}/user/writepost`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true
        }

        )
    }


    return (
        <Section>
            <Wrap>
                <ProfileWrap>
                    <ProfilePhotoWrap>
                        <img src={Photo} alt="user profile" />
                    </ProfilePhotoWrap>
                    <ProfileContentWrap>
                        <span>{userInfo.name}</span>
                        <span>{userInfo.age}</span>
                        <p>{userInfo.email}</p>
                        <p>{userInfo.area_name}</p>
                        <ProfileButtonWrap>
                            <button onClick={() => dispatch(showMyInfoModal(true))}>수정하기</button>
                        </ProfileButtonWrap>
                    </ProfileContentWrap>
                </ProfileWrap>
            </Wrap>
            <ButtonWrap>
                <Button background={writeBackgroundColor} onClick={handleWriteBoard}>
                    내가 작성한 공고글
                </Button>
                <Button background={participateBackgroundColor} onClick={handleParticipateBoard}>
                    내가 참여한 공고글
                </Button>
            </ButtonWrap>
            <CardWrap>
                {mypageInfo.map((info, idx) => <Cards info={info} key={idx} />)}
            </CardWrap>
        </Section>
    )
}

export default MyPage;