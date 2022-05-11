import styled from "styled-components";

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
    display : flex;
    flex-direction : column;
    width: 25rem;
    background: #fff;
    height: 30rem;
    overflow-y: scroll;
    border-radius: 10px;
    //padding: 2rem 2rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;
    &::-webkit-scrollbar {
        display: none;
    }
    & > p{
        cursor: pointer;
        font-size: 1.5rem;
        padding : 1rem 1.5rem 0 0 ; 
        display: flex;
        flex-direction: row-reverse;
        margin: 0;
    }
`;

export const ModalImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    object-fit: cover;
    padding-top : 2rem;
    img{
      width: 15rem;
      height: 15rem;
    }
`

export const ModalText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    & > p { 
        margin: 0;
        padding : 0.5rem 0.7rem 0;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.45em;
        color: #848484;
    }

    & > span {
        color: red;
        font-weight: 500;
        font-size: 0.9rem;
        padding : 4rem 0 1rem 0;
    }

    & > a {
        cursor: pointer;
        padding: 1rem 0 0.3rem 0;
        text-decoration: underline;
    }
`;

export const ModalButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top : 0.5rem;
    
`

export const ModalButton = styled.button`

    width: 16rem;
    height: 2.5rem;
    cursor: pointer;
    background-color: ${(props) => props.background === "#FF6767"
        ? "#FF6767" : "white"
    };
    border: ${(props) => (props.background === "#FF6767"
        ? "none" : "1px solid #848484")
    };
    border-radius: 4px;
    color : ${(props) => props.background === "#FF6767"
        ? "white" : "#848484"
    };
    font-size : 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    padding : 0;
    &:hover {
        color: ${(props) => props.background === "#FF6767"
            ? "#FF6767" : "white"
        };
        transition: all 0.3s;
        border: ${(props) => props.background === "#FF6767"
            ? "1px solid #FF6767" : "none"
        };
        background-color: ${(props) => props.background === "#FF6767"
            ? "white" : "#848484"
        };
    }    
`

export const ModalSkullImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    object-fit: cover;
    padding : 5rem 0 1rem 0  ;
    img{
      width: 16rem;
      height: 13rem;
    }
`

export const ModalSkullButton = styled.button`
    width: 16rem;
    height: 2.5rem;
    cursor: pointer;
    background-color: #FF6767;
    border-radius: 4px;
    border : none;
    color : white;
    font-size: 1rem;
    font-weight: 700; 
`