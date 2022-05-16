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
  width: 30rem;
  height: 40rem;
  background: #fff;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;
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
export const SignupInput = styled.div`
    width : 70%;
    padding-top : 1rem;
    display : flex;
    flex-direction: column;
    
`

export const ContentWrap = styled.div`
    display : flex; 
    flex-direction: column;
    padding : 0.5rem 0 0 0;
    & > span{
        padding-bottom: 0.3rem;
        font-size : 0.9rem;
        font-weight: 700;
    }

    & > input {
        padding-top: 0.5rem;
        border: 1px solid #DFDFDF;
        height : 1.5rem;
        border-radius: 4px;
    }

    & > p {
      padding-top : 0.5rem;
      padding-bottom: 0.5rem;
      font-size : 0.7rem;
      color : red;
      font-weight: 700;
    }
`
export const NameAgeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width : 100%;
`
export const Name = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    padding-right : 0.3rem;
    
    & > span{
      padding-bottom: 0.3rem;
      font-size : 0.9rem;
      font-weight: 700;
  }

    & > input {
      width : 95%;
      padding-top: 0.5rem;
      border: 1px solid #DFDFDF;
      height : 1.5rem;
      border-radius: 4px;
    }
    & > p {
      padding-top : 0.5rem;
      padding-bottom: 0.5rem;
      font-size : 0.7rem;
      color : red;
      font-weight: 700;
    }
`
export const Age = styled.div`
  width : 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  
  & > span{
      padding-bottom: 0.3rem;
      font-size : 0.9rem;
      font-weight: 700;
  }

  & > input {
      width : 96.5%;
      padding-top: 0.5rem;
      border: 1px solid #DFDFDF;
      height : 1.5rem;
      border-radius: 4px;   

    }
  & > p {
    padding-top : 0.5rem;
    padding-bottom: 0.5rem;
    font-size : 0.7rem;
    color : red;
    font-weight: 700;
  }
`



export const ButtonWrap = styled.div`
  width : 70%;
  padding-top : 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content:center;

`

export const LocationButton = styled.button`
    background-color: #F4F4F4;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size : 1rem;
    font-weight: 700;
    height: 2.5rem;
    &:hover {
        color: black;
        transition: all 0.3s;
        border: 1px solid #868e96;   
        background-color: white;
    }
`

export const ModalButton = styled.button`
    cursor: pointer;
    margin-top: 0.8rem;
    background-color: #FF6767 ;
    border: none;
    border-radius: 4px;
    color : white; 
    font-size : 1rem;
    font-weight: 800;
    height: 2.5rem;
    &:hover {
        color: #FF6767;
        transition: all 0.3s;
        border: 1px solid #FF6767;   
        background-color: white;
    }
`

export const ErrorMsgWrap = styled.div`
    display : flex; 
    flex-direction: row;
    justify-content: ${(props) => props.tag === 'nameAge' ?
    'space-around' : 'flex-start'
  };
    /* align-items: space-around; */
    height : 0.8rem;
    padding : 0.3rem 0;
  & > p {
      font-size : 0.5rem;
      color : red;
      font-weight: 700;
    }
`