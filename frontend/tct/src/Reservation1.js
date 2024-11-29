// frontend/tct/src/Reservation1.js
import React, { useState } from 'react';
import './Reservation1.css';
import Header from "./MainPage/MainHeader";
import './css/layout.css';
import './css/fonts.css';
import { useNavigate } from 'react-router-dom';

function Reservation1() {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [custum_tag, setCustomTag] = useState('');
  const [tag_1, setTag1] = useState('');
  const [tag_2, setTag2] = useState('');
  const navigate = useNavigate();

  const rooms = [
    { id: '2158', name: '일반생물학실험실' },
    { id: '2166', name: '강의실' },
    { id: '2170', name: '반도체설계실습실' },
    { id: '2171', name: '반도체소자/공정실습실' },
    { id: '3101', name: '강의실' },
    { id: '3106', name: '강의실_스마트' },
    { id: '3107', name: '강의실' },
    { id: '3114', name: '융합에너지신소재공학과 학부실습실' },
    { id: '3115', name: 'AI융합대학 컴퓨터실습실' },
    { id: '3133', name: '전자회로실험실' },
    { id: '3155', name: '디지털실험실' },
    { id: '3157', name: '기초전자실험실 1' },
    { id: '3163', name: '정보통신공학실습실1' },
    { id: '3165', name: '정보통신공학실습실2' },
    { id: '3182', name: '컴퓨터공학 실습실3' },
    { id: '3183', name: '컴퓨터공학 실습실2' },
    { id: '3189', name: '캡스톤디자인실' },
    { id: '3193', name: '설계시뮬레이션강의실' },
    { id: '4105', name: '멀티미디어공학과 실습실' },
    { id: '4127', name: '전기기계실험실' },
    { id: '4137', name: '멀티미디어공학과 학부실습실1' },
    { id: '4142', name: '신공학관 강당_스마트' },
    { id: '4147', name: '강의실_스마트' },
    { id: '4161', name: '종합설계실습실' },
    { id: '5141', name: '강의실_스마트' },
    { id: '5143', name: '강의실_스마트' },
    { id: '5145', name: '강의실' },
    { id: '5147', name: '강의실' },
    { id: '6119', name: '컴퓨터공학 실습실1(ESC4)' },
    { id: '6122', name: '정보통신공학 실습실' },
    { id: '6141', name: '강의실' },
    { id: '6144', name: '강의실' },
    { id: '6147', name: '강의실' },
  ];

  const times = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00',
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTag1Select = (tag) => {
    setTag1(tag);
  };

  const handleTag2Select = (tag) => {
    setTag2(tag);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    sendReservationData(time);
  };

  const sendReservationData = (time) => {
    const reservationData = {
        building_name: '신공학관',
        room_id: selectedRoom,
        reservation_date: `${selectedDate} ${time}`,
    };

    console.log('전송할 데이터:', JSON.stringify(reservationData));
    fetch('http://localhost:8000/api/select_classroom/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };

  const handleSubmit = () => {
    const reservationData = {
      building_name: '신공학관',
      room_id: selectedRoom,
      reservation_date: selectedDate,
      start_time: selectedTime,
      custum_tag: custum_tag,
      tag_1: tag_1,
      tag_2: tag_2,
    };

    console.log('전송할 데이터:', JSON.stringify(reservationData));
    fetch('http://localhost:8000/api/select_classroom_2/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
    })
    .then(response => {
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      response.json();
    })
    .then(data => {
      console.log(data);
      navigate('/reservation2', {state: data});
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="reservation-container">
      <Header />
      <label className="h4Font">대관하기</label>
      
      <div className="form-group">
        <div className="form">
          <label className="NormalFont">건물</label>
          <select value="신공학관" disabled>
            <option value="신공학관">신공학관(기숙사)</option>
          </select>
        </div>

        <div className="form">
          <label className="NormalFont">강의실</label>
          <select value={selectedRoom} onChange={handleRoomChange}>
            <option value="">강의실 선택</option>
            {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.id} ({room.name})
                </option>
            ))}
          </select>
        </div>

        <div className="form">
          <label className="NormalFont">날짜</label>
          <input className="SmallFont" type="date" value={selectedDate} onChange={handleDateChange}/>
        </div>

        <div className="form">
          <label className="NormalFont">시간</label>
          <div className="time-options">
            {times.map((time) => (
                <button
                    key={time}
                    className={selectedTime === time ? 'selected' : ''}
                    onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
            ))}
          </div>
        </div>
      </div>

      <div className="group">
      <div className="form-group">
        <label className="NormalFont">대관명</label>
          <div className="tag-options">
            <input
              type="text"
              placeholder="여기에 입력하세요"
              value={custum_tag}
              onChange={(e) => setCustomTag(e.target.value)}
            />
        </div>
      </div>

      <div className="form-group">
        <label className="NormalFont">목적</label>
        <div className="tag-options">
          {["회의", "공부", "강의", "시험"].map(tag => (
            <button
              key={tag}
              className={tag_1 === tag ? 'tag-button selected' : 'tag-button'}
              onClick={() => handleTag1Select(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="NormalFont">분위기</label>
        <div className="tag-options">
          {["잡담 가능", "정숙"].map(tag => (
            <button
              key={tag}
              className={tag_2 === tag ? 'tag-button selected' : 'tag-button'}
              onClick={() => handleTag2Select(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      </div>


      <button className="mini-button yellow" onClick={handleSubmit}>다음</button>
    </div>
  );
}

export default Reservation1;