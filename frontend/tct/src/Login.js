// frontend/tct/src/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/button.css';
import './css/layout.css';
import MainHeader from './MainPage/MainHeader';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 로그인 상태 확인 및 리다이렉트
  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = () => {
    axios.post('http://localhost:8000/api/login/', {
      username: username,
      password: password,
    })
    .then(response => {
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      navigate('/');
    })
    .catch(error => {
      console.error(error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    });
  };

  const handleRegister = () => {
    navigate('/register');
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
          <button className="button_main blue" onClick={handleLogin}>로그인</button>
          <button className="button_main red" onClick={handleRegister}>회원가입</button>
        </div>
      </main>
    </div>
  );
}

export default Login;
