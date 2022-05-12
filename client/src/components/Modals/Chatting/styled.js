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
    width: 40.5rem;
    height: 46rem;
    padding: 2rem 0 4rem;
    background: #fff;
    overflow: scroll;
    border-radius: 10px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;
    &::-webkit-scrollbar {
    display: none;
    }
    > div {
      overflow: auto;
      &::-webkit-scrollbar {
      display: none;
      }
      padding-left:0;
      display:flex;
      flex-direction: column-reverse;
      overflow-y:auto;
    }

`
export const ModalText = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  align-items: flex-start;

  >  .messages-me {
      width: 590px;
      /* height: 713px; */
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-end; 
      align-items: flex-end; 
      &::-webkit-scrollbar {
        width: 10px;
        background-color: none;
        }
      > .message-me {
        /* width: 590px; */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 5px;
        >.message-name{
            font-size: 12px;
            font-weight: 400;
            padding: 1px ;
        }
        > div {
            display: flex;
            /* flex-direction: row; */
            flex-direction: row-reverse;
            align-items: flex-end;
            >.message-msg{
                margin: 0 5px;
                /* background: rgb(239 240 240) ; */
                background: rgb(255 214 214) ;
                padding: 8px;
                border-radius: 5px;
                font-size: 15px;
            }
            >.message-time{
                font-size:5px;
                display: flex;
                color: rgb(150 150 150);
                letter-spacing: -0.8px;
            }
        }
      }
    }
    >  .messages-you {
      width: 590px;
      /* height: 713px; */
      overflow: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start; 
      align-items: flex-start; 
      &::-webkit-scrollbar {
        width: 10px;
        background-color: none;
        }
      > .message-you {
        /* width: 590px; */
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: 5px;
        >.message-name{
            font-size: 12px;
            font-weight: 400;
            padding: 1px ;
        }
        > div {
            display: flex;
            flex-direction: row;
            /* flex-direction: row-reverse; */
            align-items: flex-end;
            >.message-msg{
                margin: 0 5px;
                background: rgb(239 240 240) ;
                /* background: rgb(255 214 214) ; */
                padding: 8px;
                border-radius: 5px;
                font-size: 15px;
            }
            >.message-time{
                font-size:5px;
                display: flex;
                color: rgb(150 150 150);
                letter-spacing: -0.8px;

            }
        }
      }
    }
  &.send {
        background: #ffffff;
        position: absolute;
        bottom: 20px;
        left: 5%;
        > form > div{
            width: 530px;
            > div {
                height: 35px;

            }
        }
        > form > button{
            margin: 0 2px;
            width: 52px;
            height: 35px;
            background: #FF6767;
            border: none;
            border-radius: 5px;
            color: white;
        }
    }
  > span {
    position: absolute;
    /* padding: 1rem; */
    top: 5px;
    right: 15px;
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