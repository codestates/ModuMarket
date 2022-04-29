import styled from 'styled-components';
import { Link } from "react-router-dom";

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;
`

export const Section = styled.section`
    padding: 4rem 0;
    width: 100vw;
    background-color: #fff;

`

export const Wrap = styled.div`
    width : 100%;
    padding: 2rem 0;
`

export const MainContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
`


export const MainText = styled.div`
    
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    flex-direction : column;
    margin: 0;
    letter-spacing: 0.5px;

    & > span{
        color : #A8A7A7;
        font-size : 1.2rem;
        font-weight: 700;
    }

    & > h1{
        font-size : 3.75rem;
        font-weight: 900;
        margin: 0;
        
    }

    & > h2{
        font-size : 1.8rem;
        font-weight: 500;
        margin-bottom: 1.2rem;
        margin-top : 0.8rem;
    }

    & > p {
        line-height : 1.3rem;
        font-size : 1rem;
        font-weight: 500;
    }

    
`

export const MainPhoto = styled.div`
    display: flex;
    img{
        display: block;
        width : 28.875rem;
        height : 29rem;
    }
`

export const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
`

export const SearchButton = styled.button`
  
    background-color: #FF6767;
    border: none;
    border-radius: 4px;
    color : white;
    font-size : 1rem;
    font-weight: 700;
    cursor: pointer;
    width: 9rem;
    height: 2.5rem;
    &:hover {
        color: #FF6767;
        transition: all 0.3s;
        border: 1px solid #FF6767;
        background-color: #fff;
    }
    
`

export const RegisterButton = styled.button`
    background-color: #fff;
    border: 1px solid #848484;
    color : #848484;
    font-size : 1rem;
    font-weight: 700;
    border-radius: 4px;
    cursor: pointer;
    width: 9rem;
    height: 2.5rem;
    margin-left : 1rem;
    &:hover {
        color: #fff;
        transition: all 0.3s;
        background-color: #848484;
    }
`