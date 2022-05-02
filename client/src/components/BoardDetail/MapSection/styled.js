import styled from 'styled-components'

export const Section = styled.section`
    width : 100vw;
    height : 34rem;
`


export const Wrap = styled.div`
    padding-top : 3rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const MapWrap = styled.div`
    width : 75%;
    display : flex;
    align-items : center;
    padding-bottom: 1rem;
`

export const MapPhoto = styled.div`
    img{
        width : 3rem;
        height : 3rem;
    }
`

export const MapTitle = styled.div`
    &  > span {
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
        font-family: 'Open Sans', sans-serif;
        font-size : 2rem;
        font-weight : 700;
    }
`

export const Map = styled.div`
    display: flex;
    justify-content : center;
    img{
        width : 75%;
    }
    

`