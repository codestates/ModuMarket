import styled from 'styled-components'

export const Section = styled.section`
    width : 100vw;
    background-color : #f1f2f2;
`

export const Wrap = styled.div`
    width : 100%;
    padding : 4rem 0;
`

export const ProfileWrap = styled.div`
    display :flex;
    justify-content :center;
    align-items :center;
`

export const ProfilePhotoWrap = styled.div`
    width : 9.375rem;
    height : 9.375rem;
    
    img{
        width : 9.375rem;
        height : 9.375rem;
        overflow : hidden;
        border-radius: 70%;
    }

`

export const ProfileContentWrap = styled.div`
    padding : 1rem 0 0 2rem;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-size:1.1rem;
    font-weight: 600;
    & > p{
        margin: 0;
        padding: 0.3rem 0;
    }

    & > span {
        padding-bottom : 0.3rem;
        padding-right : 0.8rem;
    }
`

export const ProfileButtonWrap = styled.div`
    padding-top : 0.5rem;
    & > button{
        padding-top : 0.15rem;
        width : 5rem;
        font-size : 0.9rem;
        font-weight: 600;
        color : #848484;
        cursor: pointer;
        border-radius: 12px;
        border: 1px solid #ADADAD;
    }
`

export const ButtonWrap = styled.div`
    display: flex;
    width : 100%;
    padding-bottom : 4rem;
`
export const Button = styled.button`
    width : 100%;
    height : 3.5rem;
    font-size: 1.15rem;
    font-weight : 700;
    cursor: pointer;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    border : 0;
    border-radius: 0;
    color : white;
    background-color: ${(props) =>
        props.background === '#FF6767' ? "#FF6767" : "#D9D9D9"};
    
`

export const CardWrap = styled.div`
    display : flex;
    flex-wrap : wrap;
    width : 100%;
    justify-content: space-evenly;
    align-items : center;
`
export const NullBody = styled.div`
    display : flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items : center;
    padding-bottom: 15rem;
`