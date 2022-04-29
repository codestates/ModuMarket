import React from 'react';
import Laptop from '../../../assets/laptop.png';
import LocationMark from '../../../assets/location_mark.png';
import Coin from '../../../assets/coin.png';
import {
    Section,
    SectionWrap,
    CardWrap,
    Card,
    ContentWrap,
    ContentPhotoLaptop,
    ContentPhotoLocationMark,
    ContentPhotoCoin,
    ContentText} from './styled';

function Advantages (){
    return (
        <Section>
            <SectionWrap>
                <CardWrap>
                    <Card>
                        <ContentWrap>
                            <ContentPhotoLaptop>
                                <img src = {Laptop} alt = 'laptop'/>
                            </ContentPhotoLaptop>
                            <ContentText>
                                <h3>온라인으로 쉽게 주문</h3>
                                <p>
                                    참여하기 버튼 한번으로 <br/>
                                    원하는 공구에 참여할 수 있어요.
                                </p>
                            </ContentText>
                        </ContentWrap>
                    </Card>
                    <Card>
                    <ContentWrap>
                            <ContentPhotoLocationMark>
                                <img src = {LocationMark} alt ="location mark"/>
                            </ContentPhotoLocationMark>
                            <ContentText>
                                <h3>공구 만남 장소 선정</h3>
                                <p>
                                    동네사람들과 공동구매하고 <br/>
                                    어디서 만날지 위치를 정해요.
                                </p>
                            </ContentText>
                        </ContentWrap>
                    </Card>
                    <Card>
                    <ContentWrap>
                            <ContentPhotoCoin>
                                <img src = {Coin} alt = "coin"/>
                            </ContentPhotoCoin>
                            <ContentText>
                                <h3>경제적인 장보기</h3>
                                <p>
                                    이웃들과 함께하는 대량구매로 <br/>
                                    경제적인 장보기가 가능해요.
                                </p>
                            </ContentText>
                        </ContentWrap>
                        
                    </Card>
                </CardWrap>
            </SectionWrap>
        </Section>
    )
}

export default Advantages;