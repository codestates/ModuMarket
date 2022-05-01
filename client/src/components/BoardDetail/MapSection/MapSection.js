import React ,{useState} from 'react';
import {Section,
        Wrap,
        MapWrap,
        MapPhoto,
        MapTitle,
        Map} from './styled'
import locationIcon from '../../../assets/location_icon.png';
import ExampleMap from '../../../assets/example_map.png';

function MapSection (){

    
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
                <Map>
                    {/* <Map>에들어간 지도 img는 지도 API에 맞춰서 바꿔주어야 한다. */}
                    <img src ={ExampleMap}/>
                </Map>
            </Wrap>
        </Section>
    )
}

export default MapSection;