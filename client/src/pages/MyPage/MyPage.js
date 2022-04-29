import React ,{useState} from 'react';
import Photo from '../../assets/example_profile.jpeg';
import {
    Section,
    Wrap,
    ProfileWrap,
    ProfilePhotoWrap,
    ProfileContentWrap,
    ProfileButtonWrap,
    ButtonWrap,Button } from './styled'

function MyPage(){
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
                <Button background = "#FF6767">
                    내가 작성한 공고글
                </Button>
                <Button background = "#D9D9D9">
                    내가 참여한 공고글
                </Button>
            </ButtonWrap>
        </Section>
    )
}

export default MyPage;