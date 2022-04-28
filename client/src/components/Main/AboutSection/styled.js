import styled from 'styled-components'
import {Link} from "react-router-dom"

export const ButtonLink = styled(Link)`
    & > button {
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
        font-family: 'Open Sans', sans-serif;
        background-color: #FF6767;
        font-size: 1rem;
        font-weight:700;
        width : 16rem;
        height : 2.8rem;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        color : white;
        &:hover {
            color: #FF6767;
            transition: all 0.3s;
            border: 1px solid #FF6767;
            background-color: #fff;
        }

    }
`

export const Section = styled.section`
    width: 100vw;
    padding: 1rem 0;
    background-color: ${(props) => 
        props.background === '#f4f4f4' ? "#f4f4f4" : "white"  };
`

export const Wrap = styled.div`
    width: 100%;
    padding : 1rem 0;
`

export const IntroduceSection = styled.div`
    width : 100%;
    display : flex;
    direction : ${(props) => 
        props.direction === "right" ? "right" : "left" };
    justify-content : center;
    align-items : center;
`

export const IntroducePhoto = styled.div`

    img{
        width : 23.31rem;
        height :24rem;
    }
`

export const IntroduceContent = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    & > h3 {
        font-size: 1.6rem;
        margin-bottom: 1rem;
    }

    & > p {
        line-height: 1.5rem;
        font-size : 1.1rem;   
    }

    & > h2 {
        font-size: 2rem;
        line-height: 2.5rem;
    }

    
`