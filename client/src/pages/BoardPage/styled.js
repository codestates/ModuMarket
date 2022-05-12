import styled from "styled-components"
import Arrow from "../../assets/arrow.png"

export const Section = styled.section`
    width : 100vw;
    padding: 8rem 0 0 0;
`

export const Wrap = styled.div`
     width : 100vw;
`

export const TitleWrap = styled.div`
    display : flex;
    font-size: 2.5rem;
    font-weight: 800;
    justify-content:center;
    padding-bottom: 8rem;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
`

export const SearchWrap = styled.div`
    display: flex;
    justify-content:center;

`
export const SearchTab = styled.input`
    width : 26rem;
    height : 2rem;
    margin : 0 0.5rem;
    font-size: 1rem;
    border: 1.5px solid #DFDFDF;
    border-radius: 4px;
    padding : 0.2rem 0 0 1rem;
    
`

export const SearchButton = styled.button`
    display :flex;
    justify-content:center;
    align-items : center;
    font-weight: 700;
    width : 6rem;
    height : 2.4rem;
    margin : 0 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    background-color:#DFDFDF;
    border-radius: 4px;
    border : none;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
`

export const SearchCategory = styled.select`

    width : 7rem;
    height :2.4rem;
    font-size: 1rem;
    font-weight: 500;
    border: 1.5px solid #DFDFDF;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    padding: 0 0.5rem 0 0.5rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url(${Arrow}) no-repeat 90% 50%;
    background-size: auto 20%;

    & > option {
        
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
        font-family: 'Open Sans', sans-serif;
        
    }

`

export const ReservationButtonWrap = styled.div`
    display: flex;
    width: 100vm;
    padding : 4rem;
    flex-direction: row-reverse;
    
`

export const ReservationButton = styled.button`
    width : 7.9rem;
    height : 2.2rem;
    border : 1.5px solid #DFDFDF;
    border-radius: 4px;
    background-color: #FFFF;
    font-size : 0.9rem;
    font-weight: 400;
    cursor: pointer;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;

`


export const CardWrap = styled.div`
    display : flex;
    flex-wrap : wrap;
    width : 100%;
    justify-content: space-evenly;
    align-items : center;
`

export const RegisterNotYet = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items : center;
    & > p{
        font-size : 1.3rem;
        font-weight: 700;
        padding-bottom: 2rem;
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
        font-family: 'Open Sans', sans-serif;
    }
`
export const RegisterNotYetPhoto = styled.div`
    display : flex;
    align-items : center;
    justify-content:center;
`