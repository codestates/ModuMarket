import styled from 'styled-components';
import { Link } from "react-router-dom";

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;

`;

export const NavContainer = styled.div`
    display: flex;
    width: 100vw;
    position: relative;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    font-weight: 900;
    font-size: 2rem;
    
`;
export const NavBoard = styled.div`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 0.5em;
    font-weight: bold;
    padding: 10px;
    padding-left: 0.5rem;
`
export const NavButtons = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

`;

export const NavButton = styled.button`
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    padding: 0.8rem;
    /* padding: 0.8rem 2rem; */
    margin-left: 0.5rem;
    cursor: pointer;  
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
    color: #858585;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ADADAD;
    max-width:100px;
    max-height:40px;
    transition: all 0.3s;
    &:hover {
        color: #fff;
        transition: all 0.3s;
        background-color: #ADADAD;
    }
    /* @media all and (max-width: 1200px) {
        font-size: 1.6rem;
    } */
`;