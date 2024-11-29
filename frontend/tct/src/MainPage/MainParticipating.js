// frontend/tct/src/MainPage/MainParticipating.js
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import '../css/button.css';
import '../css/layout.css';
import '../css/modal.css';
import MainGeneral from "./MainGeneral";
import MainHeader from "./MainHeader";
import { useNavigateToNextPage } from './nextMainPage';

function MainParticipating() {
    const { showNextPage, handleNextPageClick } = useNavigateToNextPage();
    const [isFirstModalOpen, setFirstModalOpen] = useState(false);
    const [isSecondModalOpen, setSecondModalOpen] = useState(false);
    const [isWarningModalOpen, setWarningModalOpen] = useState(false); // 경고 모달 상태
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const handleFirstModalOpen = () => setFirstModalOpen(true);
    const handleFirstModalClose = () => {
        setFirstModalOpen(false);
        setCapturedImages([]); // 사진 초기화
    };

    const handleSecondModalOpen = () => {
        setSecondModalOpen(true); // 두 번째 모달 열기
    };

    const handleSecondModalClose = () => setSecondModalOpen(false);

    const handleWarningModalOpen = () => setWarningModalOpen(true); // 경고 모달 열기
    const handleWarningModalClose = () => setWarningModalOpen(false); // 경고 모달 닫기

    const handleReservationClick = () => {
        navigate('/reservation1');
    };

    const handleJoinClick = () => {
        navigate('/Join');
    };

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const capturePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImages([...capturedImages, imageSrc]);
        setIsCameraOpen(false);
    };

    const deletePhoto = (index) => {
        const newImages = [...capturedImages];
        newImages.splice(index, 1);
        setCapturedImages(newImages);
    };

    const handleExitClick = () => {
        if (capturedImages.length === 4) {
            setFirstModalOpen(false); // 첫 번째 모달 닫기
            handleSecondModalOpen(); // 두 번째 모달 열기
        } else {
            handleWarningModalOpen(); // 경고 모달 열기
        }
    };

    if (showNextPage) {
        return <MainGeneral />;
    }

    return (
        <div className="container_main">
            <MainHeader />
            <main className="main_button-container">
                <button className="button_main blue" onClick={handleReservationClick}>대관하기</button>
                <button className="button_main blue" onClick={handleJoinClick}>참여하기</button>
                <button className="button_main red" onClick={handleFirstModalOpen}>퇴실하기</button>
                <button className="button_main red" onClick={handleNextPageClick}>다음 메인페이지</button>
            </main>

            {/* 퇴실 시 사진 요구 모달 */}
            {isFirstModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content-big">
                        <label className="h4Font">사진</label>
                        <label className="NormalFont">
                            강의실 전체가 잘 보이게 촬영해주세요!
                        </label>

                        <div className="photo-section">
                            {capturedImages.length < 4 && !isCameraOpen && (
                                <button
                                    className="button_main yellow mini-button margin-bottom-small"
                                    onClick={openCamera}
                                >
                                    사진 찍기 ({capturedImages.length}/4)
                                </button>
                            )}

                            {isCameraOpen && (
                                <div className="webcam-container">
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        videoConstraints={{ width: 1280, height: 720 }}
                                        onUserMediaError={(error) => {
                                            console.error('Webcam error:', error);
                                            setIsCameraOpen(false);
                                        }}
                                        style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
                                    />
                                    <button
                                        className="button_main yellow mini-button margin-top-small"
                                        onClick={capturePhoto}
                                    >
                                        캡처
                                    </button>
                                </div>
                            )}

                            <div className="captured-images">
                                {capturedImages.map((image, index) => (
                                    <div key={index} className="image-container">
                                        <img
                                            src={image}
                                            alt={`Captured ${index + 1}`}
                                            className="captured-image"
                                        />
                                        <button
                                            className="delete-button"
                                            onClick={() => deletePhoto(index)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-row mid">
                            <button
                                className="mini-button yellow"
                                onClick={handleExitClick}
                            >
                                퇴실
                            </button>
                            <button className="mini-button red" onClick={handleFirstModalClose}>닫기</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 퇴실 완료 모달 */}
            {isSecondModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content-small">
                        <label className="h4Font">퇴실되었습니다</label>
                        <button className="modal-close NormalFont" onClick={handleSecondModalClose}>확인</button>
                    </div>
                </div>
            )}

            {/* 경고 모달 */}
            {isWarningModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content-small">
                        <label className="h4Font">사진을 더 찍으세요!</label>
                        <button className="modal-close NormalFont" onClick={handleWarningModalClose}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainParticipating;
