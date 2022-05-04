import styled from 'styled-components'

export const Section = styled.section`
    width : 100vw;
    height : 21rem;
    background-color: #F1F2F2;
`

export const Wrap = styled.div`
    display: flex;
    padding-top: 3rem;
    justify-content: center;
    width : 100%;
    margin-top: 4rem;
`

export const ContentWrap = styled.div`
    width : 75%;
`

export const UserWrap = styled.div`
    display : flex;
    align-items : center;
`

export const UserPhotoWrap = styled.div`
    img{
        width : 5rem;
        height : 5rem;
        border-radius: 70%;
        border: 0.5px solid #858585;
    }
`

export const UserNameWrap = styled.div`
    padding: 1rem;
    font-size: 1.5rem;
    font-weight : 700;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
`

export const UserContent = styled.div`
    padding: 0.8rem;
    font-size: 1.2rem;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    & > p{
        padding: 0.8rem 0;
        overflow: hidden;
        height : 4.8rem;
        margin: 0;
    }
    
`
