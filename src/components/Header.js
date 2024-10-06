import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const SunIcon = ({ isDarkMode }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isDarkMode ? "white" : "currentColor"}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ isDarkMode }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isDarkMode ? "white" : "currentColor"}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className={`app-header ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`} style={{padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>EMP Pro</h1>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <select
          onChange={handleLanguageChange}
          value={i18n.language}
          className={`p-1 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
        >
          <option value="en">English</option>
          <option value="sv">Svenska</option>
        </select>
        <button
          onClick={toggleTheme}
          className={`p-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} hover:bg-opacity-80`}
        >
          {isDarkMode ? <SunIcon isDarkMode={isDarkMode} /> : <MoonIcon isDarkMode={isDarkMode} />}
        </button>
      </div>
    </header>
  );
};

export default Header;