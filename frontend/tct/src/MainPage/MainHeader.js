// frontend/tct/src/MainPage/MainHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Inline styles for Header component
const styles = {
    header: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    logo: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
    },
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    profileIcon: {
        fontSize: '24px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    logoutButton: {
        fontSize: '16px',
        padding: '5px 10px',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: 'none',
        borderRadius: '4px',
    },
};

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 토큰 삭제
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        // 로그인 페이지로 이동
        navigate('/login');
    };

    return (
        <header style={styles.header}>
            <h1 style={styles.logo}>DGT</h1>
            <div style={styles.profileContainer}>
                <div style={styles.profileIcon}>👤</div>
                <button style={styles.logoutButton} onClick={handleLogout}>로그아웃</button>
            </div>
        </header>
    );
}

export default Header;
