// frontend/tct/src/IoTControlModal.js
import React, { useState } from 'react';
import './css/modal.css'; // 모달 스타일 추가

function IoTControlModal({ isOpen, onClose }) {
  const [isLightOn, setIsLightOn] = useState(true);
  const [isAirConOn, setIsAirConOn] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-big">
        <label className="h4Font">IoT 원격 조정</label>
        <div className="form-group top bottom">
          <div className="form-row mid top bottom">
            <label className="NormalFont mid-column">조명</label>
            <img
              className="toggle_image"
              src={isLightOn ? "toggle_on.png" : "toggle_off.png"}
              onClick={() => setIsLightOn(!isLightOn)}
            />
          </div>
          <div className="form-row mid top bottom">
            <label className="NormalFont mid-column">냉방</label>
            <img
              className="toggle_image"
              src={isAirConOn ? "toggle_on.png" : "toggle_off.png"}
              onClick={() => setIsAirConOn(!isAirConOn)}
            />
          </div>
        </div>
        <button className="button_main yellow" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default IoTControlModal;
