import React from 'react'
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';
import ModalController from './components/Modals/ModalController';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'
import './App.css';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
    width: 100%;
    height : 100%;
  }

  h2{
    font-weight: 600;
  }

  h3{
    font-weight: 700;
  }

  input{
  ::-webkit-outer-spin-button,
      ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
      }
    outline:none;
  }

  a{
    text-decoration: none;
    color: black;
  }

  button{
    background: inherit ; 
    border:none; 
    box-shadow:none; 
    border-radius:0; 
    padding:0; 
    overflow:visible; 
    cursor:pointer
  }

`




function App() {
  return (
    <>
      <GlobalStyle/>
      <Header />
      <Body />
      <Footer />
      <ModalController />
    </>

  );
}

export default App;
