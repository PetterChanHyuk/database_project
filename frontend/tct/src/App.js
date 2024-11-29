// frontend/tct/src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainGeneral from './MainPage/MainGeneral';
import MainHostBeforeStart from './MainPage/MainHostBeforeStart';
import Reservation1 from './Reservation1';
import Reservation2 from './Reservation2';
import Join from './Join';
import ReservationInfo from './ReservationInfo';
import MainParticipating from './MainPage/MainParticipating';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainGeneral />} />
        <Route path="/mainHostBeforeStart" element={<MainHostBeforeStart />} />
        <Route path="/mainParticipating" element={<MainParticipating />} />
        <Route path="/reservation1" element={<Reservation1 />} />
        <Route path="/reservation2" element={<Reservation2 />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/ReservationInfo" element={<ReservationInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
