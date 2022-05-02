import React ,{useState} from 'react';
import {Wrap} from './styled'
import DetailSection from '../../components/BoardDetail/DetailSection/DetailSection'
import ContentSection from '../../components/BoardDetail/ContentSection/ContentSection'
import MapSection from '../../components/BoardDetail/MapSection/MapSection'

function BoardDetail(){
    return (
        <Wrap>
            <DetailSection/>
            <ContentSection/>
            <MapSection/>
        </Wrap>
    )
}

export default BoardDetail;