import styled from "styled-components";

export const ModalContainer = styled.div`
    display : flex;
    flex-direction : column;
    width: 20rem;
    background: #fff;
    height: 22rem;
    overflow-y: scroll;
    border : 1px solid #D9D9D9;
    //box-shadow: 0.5px 0.5px 0.5px 0.5px #F4F4F4;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 990;

`

export const ModalImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    object-fit: cover;
    img{
      width: 15rem;
      height: 15rem;
    }
`

export const ModalForm = styled.div`
    padding : 0.5rem 0 0 0 ;
    & > p{
        margin: 0;
        color : red;
        font-weight : 600;
        font-size: 0.85rem;
    }
`