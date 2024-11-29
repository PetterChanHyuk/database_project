// frontend/tct/src/MainPage/MainHostBeforeStart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/button.css';
import MainHeader from "./MainHeader";
import MainParticipating from "./MainParticipating";
import { useNavigateToNextPage } from './nextMainPage';
import ReservationInfo from "../ReservationInfo";

function MainHostBeforeStart() {
    const { showNextPage, handleNextPageClick } = useNavigateToNextPage();
    const [showReservationInfo, setShowReservationInfo] = useState(false);
    const navigate = useNavigate();

    const startReservation = () => {
        setShowReservationInfo(true);
    };

    const handleReservationClick = () => {
        navigate('/reservation1');
    };

    const handleJoinClick = () => {
        navigate('/Join');
    }

    const handleReservationInfoClick = () => {
        navigate('/ReservationInfo');
    }

    if (showNextPage) {
        return <MainParticipating />;
    }

    if (showReservationInfo) {
        return <ReservationInfo />;
    }

    return (
        <div className="container_main">
            <MainHeader/>
            <main className="main_button-container">
                <button className="button_main blue" onClick={handleReservationClick} >대관하기</button>
                <button className="button_main blue"onClick={handleJoinClick}>참여하기</button>
                <button className="button_main blue" onClick={handleReservationInfoClick}>시작하기</button>
                <button className="button_main red" onClick={handleNextPageClick}>다음 메인페이지</button>
            </main>
        </div>
    );
}

export default MainHostBeforeStart;
