import React from 'react';
import mainPageImg from '../../../assets/main_page.png';
import {Section, 
        Wrap,
        MainContent,
        MainText,
        MainPhoto,
        ButtonWrap,
        SearchButton,
        RegisterButton,
        ButtonLink
    } from './stlyed';


function MainSection() {

    return (
        <>
        <Section>
            <Wrap>
                <MainContent>
                    <MainText>
                        <span>JOIN US</span>
                        <h2>알뜰한 소비를 위한 <br/> 공동구매 플랫폼</h2>
                        <h1>모두의 마켓</h1>
                        <p>
                            알뜰한 소비를 위해 동네 정보까지 이웃과 함께해요. <br/>
                            가깝고 따뜻한 우리 동네 이웃을 만나봐요.
                        </p>
                    <ButtonWrap>
                        <ButtonLink to="/board">
                            <SearchButton>둘러보기</SearchButton>
                        </ButtonLink>
                        <ButtonLink to="/board">
                            <RegisterButton>공구 등록하기</RegisterButton>
                        </ButtonLink>
                    </ButtonWrap>
                    </MainText>
                    <MainPhoto>
                        <img src ={mainPageImg}  alt="main"/>
                    </MainPhoto>
                </MainContent>
            </Wrap>
        </Section>
        </>
    )
}
export default MainSection;