// frontend/tct/src/MainPage/MainHostAfterStart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/button.css';
import IoTControlModal from '../IoTControlModal'; // 모듈 임포트
import MainHeader from "./MainHeader";
import MainHostBeforeStart from "./MainHostBeforeStart";
import { useNavigateToNextPage } from "./nextMainPage";

function MainHostAfterStart() {
  const { showNextPage, handleNextPageClick } = useNavigateToNextPage();
  const navigate = useNavigate();
  const [showIoTModal, setShowIoTModal] = useState(false); // 모달 상태 추가

  if (showNextPage) {
    return <MainHostBeforeStart />;
  }

  const handleReservationClick = () => {
    navigate('/reservation1');
  };

  const handleJoinClick = () => {
    navigate('/Join');
  };

  const handleManageClick = () => {
    setShowIoTModal(true); // 관리하기 버튼 클릭 시 모달 표시
  };

  const closeIoTModal = () => {
    setShowIoTModal(false);
  };

  return (
    <div className="container_main">
      <MainHeader/>
      <div className="main_button-container">
        <button className="button_main blue" onClick={handleReservationClick}>대관하기</button>
        <button className="button_main blue" onClick={handleJoinClick}>참여하기</button>
        <button className="button_main red" onClick={handleManageClick}>관리하기</button>
        <button className="button_main red" onClick={handleNextPageClick}>다음 메인페이지</button>
      </div>

      <IoTControlModal isOpen={showIoTModal} onClose={closeIoTModal} />
    </div>
  );
}

export default MainHostAfterStart;
