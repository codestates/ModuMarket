import React from 'react';
import NullPhoto from '../../../assets/null_photo.png'
import {
    Section,
    Wrap,
    ContentWrap,
    UserWrap,
    UserPhotoWrap,
    UserNameWrap,
    UserContent
} from './styled'

function ContentSection({ info }) {
    // console.log(info)


    return (
        <Section>
            <Wrap>
                <ContentWrap>
                    <UserWrap>
                        {info.userId.image === undefined || null
                            ? <UserPhotoWrap photo=''><img src={NullPhoto} alt="user img" /></UserPhotoWrap>
                            : <UserPhotoWrap photo=''><img src={info.userId.image} alt="user img" /></UserPhotoWrap>
                        }
                        <UserNameWrap>
                            <span>{info.userId.name}</span>
                        </UserNameWrap>
                    </UserWrap>
                    <UserContent>
                        <p>{info.post_content}</p>
                    </UserContent>
                </ContentWrap>
            </Wrap>
        </Section>
    )
}

export default ContentSection;