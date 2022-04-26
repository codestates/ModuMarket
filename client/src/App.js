import logo from './logo.svg';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header'
import MainPage from './pages/MainPage/MainPage'
import Signup from './components/Modals/Signup/Signup'
import Login from './components/Modals/Login/Login'
import BoardPage from './pages/BoardPage/BoardPage'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </>
  );
}

export default App;
