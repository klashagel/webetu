import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';
import './i18n'; // Add this line

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
