import React from 'react'
import logo from '../../assets/modu_logo2.png'
import kwon from '../../assets/photo_kwon.png'
import park from '../../assets/photo_park.png'
import song from '../../assets/photo_song.png'
import u from '../../assets/photo_u.png'
import githubIcon from '../../assets/github_icon.png'
import {FooterContainer, 
        LogoContainer, 
        ProfileContainer, 
        ProfilePhoto, 
        TeamContainer,
        ProfileInfo,
        GithubIcon} from './styled'
import {Link} from 'react-router-dom'


function Footer (){

    return (
        <FooterContainer>
            <LogoContainer>
            <img src = {logo} alt="logo" />
                Modu Market
            </LogoContainer>
            <TeamContainer>
                <ProfileContainer>
                    <ProfilePhoto>
                        <img src = {kwon}></img>
                        <ProfileInfo>
                        <p>
                            <span>권형안 Front-End</span>
                        </p>
                            <span>guddks84@gmail.com</span>
                        </ProfileInfo>
                    </ProfilePhoto>
                    <ProfilePhoto>
                        <img src = {park}></img>
                        <ProfileInfo>
                        <p>
                            <span>박보미 Back-End</span>
                        </p>
                        <span>guddks84@gmail.com</span>
                        </ProfileInfo>
                    </ProfilePhoto>
                    <ProfilePhoto>
                        <img src = {song}></img>
                        <ProfileInfo>
                         <p>
                            <span>송혜원 Front-End</span>
                        </p>
                        <span>guddks84@gmail.com</span>
                        </ProfileInfo>
                    </ProfilePhoto>
                    <ProfilePhoto>
                        <img src = {u}></img>
                        <ProfileInfo>
                        <p>
                            <span>유태의 Back-End</span>
                        </p>
                        <span>guddks84@gmail.com</span>
                        </ProfileInfo>
                    </ProfilePhoto>
                </ProfileContainer>
            </TeamContainer>
            <GithubIcon>
                <img src = {githubIcon} href= "https://github.com/codestates/ModuMarket/"/>
                <span>About Us</span>
            </GithubIcon>
        </FooterContainer>
    )
}

export default Footer;