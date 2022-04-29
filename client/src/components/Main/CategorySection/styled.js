import styled from 'styled-components';

export const Section = styled.section`
    width:100%;
    display: flex;
    justify-content: center;
    background-color: #f4f4f4;
    
    
`

export const Wrap = styled.div`
    display: flex;
    max-width: 32rem;
    padding: 2rem 2rem;
    
`

export const ImgWrap = styled.div`
    display: flex;
    align-items:end;
    padding : 0;
    img{
        width:14.375rem;
        height: 7.5rem;
    }
`


export const CategoryUl = styled.ul`
    max-width :100%;
    display : flex;
    flex-shrink: 0;
    justify-content : space-evenly;
    flex-wrap: wrap;
    margin: 0rem;
    padding-left: 5rem;
`

export const CategoryLi = styled.li`
    display : flex;
    justify-content: center;
    align-items: center;
    margin-right : 4rem;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    img{
        padding-right: 1rem;
        padding-top: 1rem;
        width: 3rem;
        height : 3rem;
    }
    & > span{
        padding-top: 1rem;
        font-size: 1.1rem;
        color : #848484;
    }
`