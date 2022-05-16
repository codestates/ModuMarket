import styled from 'styled-components';

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 485px;
  background: whitesmoke;
  max-height: 90%;
  overflow-y: scroll;
  border : 1px solid #F1F2F2;
  border-radius: 10px;
  padding: 3rem 1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
  &::-webkit-scrollbar {
    display: none;
  }
  @media all and (max-width: 600px) {
    width: 100%;
    /* height: 100%; */
    max-height: 90%;
    border-radius: 10px;
    padding: 6rem 1rem;
    &::-webkit-scrollbar {
      display: block;
    }
  }
  @media all and (max-height: 600px) {
    &::-webkit-scrollbar {
      display: block;
    }
  }
`;


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
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.45em;
    margin: 0;
    color: #868e96;
  }
  > button {
    font-weight: 400;
    margin-top: 2rem;
    color: #FF6767;
    border: none;
    cursor: pointer;
    background: none;
    border-bottom: 1px solid #FF6767;
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
margin-top: 1rem;
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