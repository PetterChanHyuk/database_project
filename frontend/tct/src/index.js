// frontend/tct/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.js를 가져옵니다.
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
