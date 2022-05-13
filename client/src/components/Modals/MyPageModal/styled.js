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
  background: #fff;
  max-height: 90%;
  overflow-y: scroll;
  border-radius: 10px;
  padding: 3rem 3rem;
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
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 1.45em;
    margin-top: 1.5rem;
    color: #868e96;
    > button {
      font-weight: 400;
      color: #FF6767;
      border: none;
      cursor: pointer;
      background: none;
      border-bottom: 1px solid #FF6767;
    }
  }
  @media all and (max-width: 620px) {
    > span {
      font-size: 3rem;
    }
  }
  `;

export const ModalInform = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  & > span {
    color: black;
    font-weight: 500;
    font-size: 1.2rem;
  }
  & > p {
    color: black;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.45em;
  } 
  
  `

export const ModalInformRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  & > span {
    justify-self: end;
    color: black;
    font-weight: 500;
    font-size: 1.2rem;
  }
  & > p {
    color: black;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.45em;
  }
  
  `

export const ModalNameWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items : center;
    & > p {
      display:flex;
      flex-direction: row-reverse;
      width: 8rem;
      color: black;
      font-weight: 500;
      font-size: 1.2rem;
      padding-right: 1rem;
    }
    
    `
export const ModalAgeWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items : center;
    & > span {
      padding-right: 0.5rem;
    }
    `

export const ModalImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 485px;
    object-fit: cover;
    img{
      width: 13rem;
      height: 13rem;
    }
    `
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
export const InputPW = styled.input`
    align-self: stretch;
    padding: 0.5em;
    color: #FF6767;
    background: white;
    border: none;
    border-radius: 3px;
    
    `;

export const InputErrorMessage = styled.div`
    font-size : 0.8rem;
    font-weight: 700;
    margin-top: 0.5rem;
    color: #FF6767;
`

export const ModalContainerPW = styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 30%;
      max-width: 485px;
      background: whitesmoke;
      overflow-y: scroll;
      border-radius: 10px;
      padding: 2rem 4rem;
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

export const ModalTextPW = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  > span {
    position: absolute;
    padding: 2rem;
    top: 0;
    right: 0;
    font-size: 2rem;
    cursor: pointer;
  }
  > h2 {
    align-self: center;
    color: black;
    font-weight: 500;
    font-size: 2.5rem;
  }
  > p {
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.45em;
    margin: 0.4rem 0;
    color: #868e96;
  }
  @media all and (max-width: 620px) {
    > span {
      font-size: 3rem;
    }
  }
  `;

export const ModalContainerPWCheck = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 40%;
    max-width: 485px;
    background: whitesmoke;
    overflow-y: scroll;
    border-radius: 10px;
    padding: 2rem 4rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 990;
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
