import styled, { keyframes } from 'styled-components';

export const  BodyDiv = styled.div`
    width : 100%;
    height : 50%;
    
`
const floatingAnimation = keyframes`
 0% {
        transform: translateY(0);    
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0);
    }
`
export const AuthContainer = styled.div`

    background-color: #f4f4f4;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

    img{
        width: 20rem;
        height: 20rem;
        animation: ${floatingAnimation} 2s infinite;

    }

`