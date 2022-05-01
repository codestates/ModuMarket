import React ,{useState} from 'react';
import {dummyData} from "../../../assets/dummy"
import {
    Section,
    Wrap,
    ContentWrap,
    UserWrap,
    UserPhotoWrap,
    UserNameWrap,
    UserContent} from './styled'

function ContentSection (){
    const [Data, setData] = useState(dummyData.cardInfo[0])
    return (
        <Section>
            <Wrap>
                <ContentWrap>
                    <UserWrap>
                        <UserPhotoWrap>
                            <img src = {Data.userImage}/>
                        </UserPhotoWrap>
                        <UserNameWrap>
                            <span>{Data.userName}</span>
                        </UserNameWrap>
                    </UserWrap>
                    <UserContent>
                        <p>{Data.content}</p>
                    </UserContent>
                </ContentWrap>
            </Wrap>
        </Section>
    )
}

export default ContentSection;