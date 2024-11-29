// frontend/tct/src/MainPage/MainGeneral.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/button.css';
import '../css/layout.css';
import MainHeader from './MainHeader';
import MainHostAfterStart from './MainHostAfterStart';
import { useNavigateToNextPage } from './nextMainPage';

function MainGeneral() {
  const { showNextPage, handleNextPageClick } = useNavigateToNextPage();
  const navigate = useNavigate();

  // 로그인 상태 확인 및 리다이렉트
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  if (showNextPage) {
    return <MainHostAfterStart />;
  }

  const handleReservationClick = () => {
    navigate('/reservation1');
  };

  const handleJoinClick = () => {
    navigate('/Join');
  };

  return (
    <div className="container_main">
      <MainHeader />
      <main className="main_button-container">
        <button className="button_main blue" onClick={handleReservationClick}>대관하기</button>
        <button className="button_main blue" onClick={handleJoinClick}>참여하기</button>
        <button className="button_main_disabled" disabled>시작하기</button>
        <button className="button_main red" onClick={handleNextPageClick}>다음 메인페이지</button>
      </main>
    </div>
  );
}

export default MainGeneral;
