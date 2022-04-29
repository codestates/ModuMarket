import React ,{useState} from 'react';
import Photo from '../../assets/example_profile.jpeg';
import Cards from '../../components/Cards/Cards'
import { myPageDummyData, myPageDummyData2 } from '../../assets/dummy';
import {
    Section,
    Wrap,
    ProfileWrap,
    ProfilePhotoWrap,
    ProfileContentWrap,
    ProfileButtonWrap,
    ButtonWrap,Button,
    CardWrap} from './styled'

function MyPage(){

    const [mypageInfo, setMyPageInfo]  =useState(myPageDummyData.cardInfo);
    const [writeBackgroundColor, setWriteBackgroundColor] = useState("#FF6767")
    const [participateBackgroundColor, setParticipateBackgroundColor] = useState("#D9D9D9")

    function handleParticipateBoard (){
        setMyPageInfo(myPageDummyData2.cardInfo);
        setWriteBackgroundColor("#D9D9D9")
        setParticipateBackgroundColor("#FF6767")

    }

    function handleWriteBoard (){
        setMyPageInfo(myPageDummyData.cardInfo)
        setWriteBackgroundColor("#FF6767")
        setParticipateBackgroundColor("#D9D9D9")
    }


    return (
        <Section>
            <Wrap>
                <ProfileWrap>
                    <ProfilePhotoWrap>
                        <img src={Photo} alt= "user profile"/>
                    </ProfilePhotoWrap>
                    <ProfileContentWrap>
                        <span>김코딩</span>
                        <span>29</span>
                        <p>yoon@gmail.com</p>
                        <p>서울시 관악구 서울대로 9길 28-2</p>
                        <ProfileButtonWrap>
                            <button>수정하기</button>
                        </ProfileButtonWrap>
                    </ProfileContentWrap>
                </ProfileWrap>
            </Wrap>
            <ButtonWrap>
                <Button background = {writeBackgroundColor} onClick={handleWriteBoard}>
                    내가 작성한 공고글
                </Button>
                <Button background = {participateBackgroundColor} onClick={handleParticipateBoard}>
                    내가 참여한 공고글
                </Button>
            </ButtonWrap>
            <CardWrap>
                {mypageInfo.map((info, idx) => <Cards info={info} idx ={idx}/> )}
            </CardWrap>
        </Section>
    )
}

export default MyPage;