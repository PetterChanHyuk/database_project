// frontend/tct/src/ReservationInfo.js
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './css/button.css';
import './css/fonts.css';
import './css/layout.css';
import './css/modal.css'; // 모달 스타일 추가
import IoTControlModal from './IoTControlModal'; // IoTControlModal 컴포넌트 임포트
import MainHeader from "./MainPage/MainHeader";

function ReservationInfo() {
  const [data, setData] = useState(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showIoTModal, setShowIoTModal] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false); // 캡처 완료 여부
  const webcamRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/start/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.reservation) {
          setData({
            custom_tag: data.reservation.custum_tag,
            building_name: data.reservation.building_name,
            room_id: data.reservation.room_id,
            tag_1: data.reservation.tag_1,
            tag_2: data.reservation.tag_2,
          });
        } else {
          console.error('Reservation data not found:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setShowUnlockModal(true);
  };

  const closeUnlockModal = () => {
    setShowUnlockModal(false);
  };

  const handleNext = () => {
    setShowIoTModal(true);
  };

  const closeIoTModal = () => {
    setShowIoTModal(false);
  };

  const openCamera = () => {
    setIsCameraOpen(true); // 카메라 기능 활성화
  };

  const capturePhoto = () => {
    if (!isCaptured) { // 캡처가 한 번만 수행되도록
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCameraOpen(false); // 캡처 후 카메라 닫기
      setIsCaptured(true); // 캡처 완료 상태로 설정하여 '다음으로' 버튼 활성화
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div>
      <MainHeader />
      <main className="reservation-container">
        <label className="h4Font">대관 정보</label>
        <div className="form-group">
          {data ? (
            <>
              <div className="form">
                <label className="NormalFont">대관명</label>
                <input className="SmallFont" type="text" value={data.custom_tag} readOnly />
              </div>
              <div className="form-row">
                <div className="form">
                  <label className="NormalFont">건물</label>
                  <input className="SmallFont" type="text" value={data.building_name} readOnly />
                </div>
                <div className="form">
                  <label className="NormalFont">강의실</label>
                  <input className="SmallFont" type="text" value={data.room_id} readOnly />
                </div>
              </div>
              <div className="form-row">
                <div className="form">
                  <label className="NormalFont">태그1</label>
                  <input className="SmallFont" type="text" value={data.tag_1} readOnly />
                </div>
                <div className="form">
                  <label className="NormalFont">태그2</label>
                  <input className="SmallFont" type="text" value={data.tag_2} readOnly />
                </div>
              </div>
            </>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>

        <div className="form">
          <label className="h4Font">유의사항</label> 
          <label className="SmallFont box">
            &nbsp;  - 이용시간 08:00-22:00 (1회 4시간 제한)
            <br /> &nbsp; - 학생수업/실습/연구에 지장이 없는 경우만 승인
            <br /> &nbsp; - 소음 발생 행사는 학림관 소강당만 가능
            <br /> &nbsp; - 승인 후에도 학교 공식행사 발생 시 취소될 수 있음
            <br /> &nbsp; - 대여 전후 강의실 상태 확인을 위한 사진 촬영 필수
          </label>
        </div>

        <div className="action-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', width: '75%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/camera.png"
              alt="Camera Icon"
              onClick={openCamera}
              style={{ cursor: 'pointer', width: '50px', height: '50px', marginRight: '5px' }}
            />
            <span className="NormalFont">사진</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/lock.png"
              alt="Unlock"
              onClick={handleUnlock}
              style={{ cursor: 'pointer', width: '50px', height: '50px', marginRight: '5px' }}
            />
            <span className="NormalFont">잠금해제</span>
          </div>
        </div>

        {showUnlockModal && (
          <div className="modal-overlay">
            <div className="modal-content-small">
              <h2>잠금해제되었습니다!</h2>
              <button className="modal-close" onClick={closeUnlockModal}>닫기</button>
            </div>
          </div>
        )}

        {isCameraOpen && !capturedImage && (
          <div className="webcam-container">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMediaError={(error) => {
                console.error('Webcam error:', error);
                setIsCameraOpen(false);
              }}
              style={{ width: '80%', height: 'auto', maxWidth: '400px', marginTop: '10px' }}
            />
            <button className="button_main red" onClick={capturePhoto} style={{ width: '80%', marginTop: '10px' }}>
              캡처
            </button>
          </div>
        )}

        {/* 캡처된 이미지가 있는 경우 표시 */}
        {capturedImage && (
          <div className="captured-image-container" style={{ width: '80%', marginTop: '10px' }}>
            <img src={capturedImage} alt="Captured" style={{ width: '100%', borderRadius: '5px' }} />
          </div>
        )}

        <button
          className="button_main yellow"
          onClick={handleNext}
          disabled={!isCaptured}
          style={{
            marginTop: '20px',
            width: '80%',
            backgroundColor: isCaptured ? '#ffd966' : '#d3d3d3',
            color: isCaptured ? 'black' : '#6c6c6c'
          }}
        >
          다음으로
        </button>
      </main>

      {/* IoT 제어 모달 */}
      <IoTControlModal isOpen={showIoTModal} onClose={closeIoTModal} />
    </div>
  );
}

export default ReservationInfo;
