import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileImg, nothingImg } from '../../assets/images'
import Cards from '../../components/Cards/Cards'
import { showMyInfoModal } from '../../reducers/modalSlice'
import { getWritePost, getParticipatePost, checkWriteNull, checkPartyNull } from '../../reducers/myPostSlice'
import { REACT_APP_API_URL } from '../../config';
import {
    Section,
    Wrap,
    ProfileWrap,
    ProfilePhotoWrap,
    ProfileContentWrap,
    ProfileButtonWrap,
    ButtonWrap, Button,
    CardWrap,
    NullBody
} from './styled'
import axios from 'axios';

function MyPage() {

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo.userInfo);
    const accessToken = useSelector((state) => state.login.accessToken);
    const myWritePost = useSelector((state) => state.mypost.writePost);
    const myPartyPost = useSelector((state) => state.mypost.participatePost);
    const isWriteNull = useSelector((state) => state.mypost.isWriteNull);
    const isPartyNull = useSelector((state) => state.mypost.isPartyNull);
    const [writeBackgroundColor, setWriteBackgroundColor] = useState("#FF6767")
    const [participateBackgroundColor, setParticipateBackgroundColor] = useState("#D9D9D9")
    const [isWrite, setIsWrite] = useState(true);


    function handleParticipateBoard() {
        setIsWrite(false);
        axios.get(`${REACT_APP_API_URL}/user/participatepost`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }

        ).then((result) => {
            if (result.status === 200) {
                dispatch(checkPartyNull(false));
                dispatch(getParticipatePost(result.data.data));
            } else {
                dispatch(checkPartyNull(true));
            }
        })
        setWriteBackgroundColor("#D9D9D9")
        setParticipateBackgroundColor("#FF6767")

    }

    function handleWriteBoard() {
        setIsWrite(true);
        axios.get(`${REACT_APP_API_URL}/user/writepost`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                withCredentials: true
            }

        ).then((result) => {
            if (result.status === 200) {
                dispatch(checkWriteNull(false));
                dispatch(getWritePost(result.data.data));
            } else {
                dispatch(checkWriteNull(true));
            }
        })
        setWriteBackgroundColor("#FF6767")
        setParticipateBackgroundColor("#D9D9D9")
    }


    return (
        <Section>
            <Wrap>
                <ProfileWrap>
                    <ProfilePhotoWrap>
                        <img src={profileImg[1]} alt="user profile" />
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
            {
                isWrite ?
                    isWriteNull ?
                        <NullBody>
                            <img src={nothingImg} alt="nothing to show" />
                            <h2>작성한 공고게시글이 없습니다</h2>
                        </NullBody>
                        :
                        <CardWrap>
                            {myWritePost.map((info, idx) => <Cards info={info} key={idx} />)}
                        </CardWrap>

                    :
                    isPartyNull ?
                        <NullBody>
                            <img src={nothingImg} alt="nothing to show" />
                            <h2>참여한 공고게시글이 없습니다</h2>
                        </NullBody>
                        :
                        <CardWrap>
                            {myPartyPost.map((info, idx) => <Cards info={info} key={idx} />)}
                        </CardWrap>
            }
        </Section>
    )
}

export default MyPage;