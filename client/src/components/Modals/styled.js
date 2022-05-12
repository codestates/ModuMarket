import styled from "styled-components";

export const ModalBackground  = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
`

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32.5rem;
    height: 50rem;
    padding-bottom: 1rem;
    background: #fff;
    overflow: scroll;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;
`

export const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > span {
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
    font-size: 2rem;
    cursor: pointer;
  }
  > h2 {
    color: black;
    font-weight: 700;
    font-size: 3.906rem;
  }
  > p {
    font-weight: 400;
    font-size: 1.28rem;
    line-height: 1.45em;
    margin-top: 1.5rem;
    color: #868e96;
    > button {
      font-weight: 500;
      color: black;
      border: none;
      cursor: pointer;
      background: none;
      border-bottom: 1px solid black;
    }
  }
  @media all and (max-width: 620px) {
    > span {
      font-size: 3rem;
    }
  }
`;

export const ModalButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #FF6767;
    border: none;
    border-radius: 4px;
    color : white;
    font-size : 1rem;
    font-weight: 700;
    height: 2.5rem;
    &:hover {
        color: #FF6767;
        transition: all 0.3s;
        border: 1px solid #FF6767;
        background-color: #fff;
    }
    
`