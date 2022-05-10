import styled from "styled-components"
import { Link } from "react-router-dom";

export const Section = styled.section`
    display : flex;
    
`

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: black;
`

export const CardWrap = styled.div`
    display: flex;
    width : 24rem;
    height : 30rem;
    padding: 0 2rem 3rem 2rem;
`

export const Card = styled.div`
    margin: 0;
    cursor: pointer;
    border : none;
    width : 24rem;
    height : 30rem;
    border-radius: 12px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`

export const CardPhoto = styled.div`
    display : flex;
    justify-content: center;
    /* width : 24rem;
    height : 11.3rem; */
    overflow: hidden;
    & > img{
        width : ${(props) =>
        (props.image === "" ? '13rem' : '24rem')
    };
        height : 11.3rem;  
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
`

export const CardCategoryWrap = styled.div`
    display : flex;
    align-items : center;
    padding : 1rem 0 0.5rem 0;
    width : 100%;
`

export const CardCategoryPhoto = styled.div`
    padding-left: 1.5rem;
    & > img{
        width : 2.3rem;
        height : 2.3rem;
    }
`


export const CardCategory = styled.div`
    font-weight: 700;
    font-size: 1rem;
    padding: 0 0.7rem;
`


export const CardTitle = styled.div`
    padding: 0 1.5rem 0 1.5rem;
    overflow: hidden;
    & > h3 {
        height: 1.875rem;
        font-size : 1.5rem;
        margin : 0;
    }
`


export const CardContent = styled.div`
    padding: 0.7rem 1.5rem 0.2rem 1.5rem;
    overflow: hidden;
    & > p{
        width: 21rem;
        height: 4.625rem;
        margin : 0;
        font-size: 0.9rem;
        
    }
`

export const CardLocation = styled.div`

    display : flex;
    align-items : center;
    overflow: hidden;
    padding: 0.7rem 1.5rem 0 1.5rem;
    img{
        width : 1.8rem;
        height : 1.8rem;
    }

& > p {
    margin : 0;
    width : 15.5275rem;
    height : 0.8rem;
    padding-left: 0.3rem;
    font-size : 0.9rem;
    font-weight: 600;
}
`
export const IsValid = styled.div`
    display : flex;
    width : 100%;
    flex-direction: row-reverse;
    
    & > p{
        color : #FF6767;
        padding: 0 1.5rem 0 1.5rem;
        font-size : 0.8rem;
        font-weight: 600;
    }
`
