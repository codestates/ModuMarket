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
  width: 25rem;
  height: 32rem;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 900;
  &::-webkit-scrollbar {
    display: none;
  }

`;

export const XWrap = styled.div`
  display: flex;
  flex-direction: row-reverse;
  & > span{
    padding: 1rem 1.5rem 0 0 ;
    margin: 0;
    font-size: 1.5rem;
    cursor: pointer;
  }
 
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`


export const ModalTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    color: black;
    padding : 1.5rem 0 0.5rem 0;
    margin: 0;
    font-weight: 700;
    font-size:2.5rem;
  }
`

export const ModalTitleText = styled.div`
  display: flex;
  > p {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.45em;
    color: #868e96;
  }

  & > a{
    padding: 0.2rem 0 0 0.4rem;
    font-size: 0.9rem;
    text-decoration: underline;
    cursor:pointer;
  }
`

export const LoginInput = styled.div`
    width: 100%;
    padding : 1rem 0;
  
  & > form {
    width :100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const LoginWrap = styled.div`
  width : 70%;
  display: flex;
  flex-direction: column;
  justify-content:center;

  & > span{
    font-size : 0.8rem;
    font-weight: 700;
    padding-top : 0.8rem;
  }

  & > input{
    
    padding-top: 0.5rem;
    border: 1px solid #DFDFDF;
    height : 1.5rem;
    border-radius: 4px;
  }


`

export const ButtonWrap = styled.div`
  width : 70%;
  display: flex;
  flex-direction: column;
  justify-content:center;
`

export const ModalButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 0.5rem;
    background-color: ${(props) => 
      (props.background === "#FF6767" 
        ? "#FF6767" 
          :  props.background === "white" 
            ? "white"
              : "#F7E600"  )};
    border: ${(props) => 
      (props.background === "#FF6767" 
        ? "none" 
          :  props.background === "white" 
            ? "1px solid #DFDFDF"
              : "none"  )};
    border-radius: 4px;
    color : ${(props) => 
      (props.background === "#FF6767" 
        ? "white" 
          :  props.background === "white" 
            ? "black"
              : "white"  )};
    font-size : 1rem;
    font-weight: 700;
    height: 2.5rem;
    &:hover {
        color: ${(props) => 
          (props.background === "#FF6767" 
            ? "#FF6767" 
              :  props.background === "white" 
                ? "white"
                  : "#F7E600"  )};
        transition: all 0.3s;
        border: ${(props) => 
          (props.background === "#FF6767" 
            ? "1px solid #FF6767" 
              :  props.background === "white" 
                ? "none"
                  : "1px solid #F7E600")};
        background-color: ${(props) => 
          (props.background === "#FF6767" 
            ? "white" 
              :  props.background === "white" 
                ? "#DFDFDF"
                  : "white"  )};
    }
    & > img {
      width: 1.5rem;
      height : 1.5rem;
      padding-right: 0.5rem;
    }
`