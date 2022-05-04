import React ,{useState, useEffect} from 'react';
import {Section,
        Wrap,
        MapWrap,
        MapPhoto,
        MapTitle,
        Map} from './styled'
import locationIcon from '../../../assets/location_icon.png';
import KakaoMap from './Map';

function MapSection ({info}){
    let post_location = info.post_location

    useEffect(() => {
        KakaoMap(post_location);
    }, [])
    

    
    return (
        <Section>
            <Wrap>
                <MapWrap>
                    <MapPhoto>
                        <img src ={locationIcon} />                   
                    </MapPhoto>
                    <MapTitle>
                        <span>만남 장소</span>
                    </MapTitle>
                </MapWrap>
                <Map id='map'></Map>
            </Wrap>
        </Section>
    )
}

export default MapSection;