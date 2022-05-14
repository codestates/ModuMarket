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
    return (
        <Section>
            <Wrap>
                <ContentWrap>
                    <UserWrap>
                        {   
                          info.data.userId.image === undefined || null
                            ? <UserPhotoWrap photo = ''><img src = {NullPhoto} alt="user img"/></UserPhotoWrap>
                            : <UserPhotoWrap photo = ''><img src = {info.data.userId.image} alt="user img"/></UserPhotoWrap>
                        }
                        <UserNameWrap>
                            <span>{info.data.userId.name}</span>
                        </UserNameWrap>
                    </UserWrap>
                    <UserContent>
                        <p>{info.data.post_content}</p>
                    </UserContent>
                </ContentWrap>
            </Wrap>
        </Section>
    )
}

export default ContentSection;