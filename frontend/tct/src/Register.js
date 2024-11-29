// frontend/tct/src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/button.css';
import './css/layout.css';
import MainHeader from './MainPage/MainHeader';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState('Student');
  const navigate = useNavigate();

  const handleRegister = () => {
    axios.post('http://localhost:8000/api/register/', {
      username: username,
      password: password,
      student_id: studentId,
      role: role
    })
    .then(response => {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
    })
    .catch(error => {
      console.error(error);
      alert('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
    });
  };

  return (
    <div className="container_main">
      <MainHeader />
      <main className="main_button-container">
        <div className="form">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="학번"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
          />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="Student">학생</option>
            <option value="Professor">교수</option>
            <option value="Admin">관리자</option>
          </select>
          <button className="button_main blue" onClick={handleRegister}>회원가입</button>
        </div>
      </main>
    </div>
  );
}

export default Register;
