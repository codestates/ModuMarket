import React from "react";
import CoinMan from "../../../assets/coin_man.png";
import ChickenRun from "../../../assets/chicken_run.png";
import Exchange from "../../../assets/exchange.png";
import {
    Section,
    Wrap,
    IntroduceSection,
    IntroducePhoto,
    IntroduceContent} from './styled'

function AboutSection (){
    return (
        <div>
            <Section background = "#f4f4f4">
                <Wrap>
                    <IntroduceSection direction = "right">
                        <IntroducePhoto>
                            <img src = {CoinMan} alt ="introduce"/>
                        </IntroducePhoto>
                        <IntroduceContent>
                            <h3>알뜰살뜰 소비를 위한 당신!</h3>
                            <p>
                                "한개만 사는 것보다 여러개를 한거번에 사는게 더 싸잖아?" <br/>
                                하고 생각해보신 적이 있나요?<br/>
                                모두의 마켓에서는 같은 동네의 이웃들과<br/>
                                알뜰살뜰 현명한 소비활동이 가능해요.
                            </p>
                        </IntroduceContent>
                    </IntroduceSection>
                </Wrap>
            </Section>
            <Section background = "white">
            <Wrap>
                <IntroduceSection direction = "left">
                    <IntroduceContent>
                        <h3>이웃들과 함께하는 모두의 마켓은</h3>
                        <p>
                            가까이 사는 이웃들과 공구하고 싶은 물품을 찾을 수 있어요. <br/>
                            다양한 물품을 카테고리별로 확인할 수 있어요.<br/>
                            만남장소 시간, 구매하는 양을 구체적으로 조율할 수 있어요.<br/>
                            내가 관심있는 물품을 찜해둘 수 있어요.<br/>
                            거래 후 좋았던 점을 후기로 남겨 이웃들과 공유할 수 있어요.
                        </p>
                    </IntroduceContent>
                    <IntroducePhoto>
                        <img src = {ChickenRun} alt ="introduce"/>
                    </IntroducePhoto>
                </IntroduceSection>
            </Wrap>
        </Section>
        <Section background = "#f4f4f4">
            <Wrap>
                <IntroduceSection direction = "right">
                    <IntroducePhoto>
                        <img src = {Exchange} alt ="introduce"/>
                    </IntroducePhoto>
                    <IntroduceContent>
                        <h2>
                            지금 모두의 마켓으로 <br/>
                            이웃들과 공동구매를 시작해보세요!
                        </h2>
                        <button>우리동네 공구 찾기</button>
                    </IntroduceContent>
                </IntroduceSection>
            </Wrap>
        </Section>
    </div>
    )
}
export default AboutSection;