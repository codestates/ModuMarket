import styled from 'styled-components';


export const FooterContainer = styled.footer `
    width: 100vw;
    background-color : #333B52;
    padding-top : 6rem;
    padding-bottom : 1rem;
   
`
export const LogoContainer = styled.div `
    width: 100%;
    font-size : 2rem;
    text-align : center;
    margin: 0 auto;
    text-align: center;
    color: white;
    img {
        width: auto;
        height: 2rem;
    }
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
`
export const TeamContainer = styled.div`
    display: flex;
    width : 100%;
    justify-content : center;
    align-items : center;
`


export const ProfileContainer = styled.div `
    display: flex;
    position : relative;
    padding: 1rem;
    justify-content : space-evenly;
    color : #CED4DA;
    width: 80vw;
    margin-top: 2rem;
    border-top: 2px solid #CED4DA;
    img {
    width: 4rem;
    height: 4rem;
    }
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-weight: 600;
`

export const ProfilePhoto = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
`

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content : center;
    
    & > p {
        margin: 0;
    }

    & > p span {
        font-size: 1rem;
        margin-left: 0.5rem;
    }

    & > span:last-child {
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }
`

export const GithubIcon = styled.div`
    width : 100%;
    display : flex;
    margin-top: 5rem;
    justify-content : center;
    align-items : center;
    gap : 1rem;
    color : #CED4DA;
    img{
        width : 2.5rem;
        height : 2.5rem;
    }
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
`
