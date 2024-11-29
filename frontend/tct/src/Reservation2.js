// frontend/tct/src/Reservation2
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reservation2.css';
import './css/modal.css';

function Reservation2() {
  const [reservationData, setReservationData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가

  const navigate = useNavigate();

  const handleMainHostBeforeStartClick = () => {
    navigate('/mainHostBeforeStart');
  };

  useEffect(() => {
    fetchReservationData();
  }, []);


  const fetchReservationData = () => {
    fetch('http://localhost:8000/api/get_latest_reservation/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setReservationData(data))
      .catch(error => console.error('Error:', error));
  };

  const handleCheckboxChange = () => setIsChecked(!isChecked);

  const handleCompleteClick = () => {
    // 모달을 열도록 설정
    setIsModalOpen(true);
  };

  return (
    <div className="reservation-summary-container">
      <header>
        <h1 className="logo">TCT</h1>
        <span className="profile-icon">👤</span>
      </header>

      <h2 className="title">요약정보</h2>
      {reservationData ? (
        <>
          <p>건물명: {reservationData.building_name}</p>
          <p>강의실 ID: {reservationData.room_id}</p>
          <p>예약 날짜: {reservationData.reservation_date}</p>
          <p>예약 시간: {reservationData.start_time} - {reservationData.end_time}</p>
          <p>대관명: {reservationData.custom_tag}</p>
          <p>태그1: {reservationData.tag_1}</p>
          <p>태그2: {reservationData.tag_2}</p>
        </>
      ) : (
        <p>로딩 중...</p>
      )}

      <h3 className="subtitle">유의사항</h3>
      <div className="notice-box">
      &nbsp;  - 이용시간 08:00-22:00 (1회 4시간 제한)
              <br></br> &nbsp; - 학생수업/실습/연구에 지장이 없는 경우만 승인
              <br></br> &nbsp; - 소음 발생 행사는 학림관 소강당만 가능
              <br></br> &nbsp; - 승인 후에도 학교 공식행사 발생 시 취소될 수 있음
              <br></br> &nbsp; - 대여 전후 강의실 상태 확인을 위한 사진 촬영 필수
      </div>

      <label className="checkbox-container">
        위 내용에 동의합니다
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </label>

      <button
        className="complete-button"
        disabled={!isChecked}
        onClick={handleCompleteClick} // 버튼 클릭 시 모달 열림
      >
        완료
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-small">
            <p>신청되었습니다</p>
            <div className = "silverprize">
              <button className="mini-button yellow" onClick={handleMainHostBeforeStartClick}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation2;
