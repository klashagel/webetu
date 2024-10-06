import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex-1 bg-cover bg-center" style={{backgroundImage: "url('/digital-brain-technology-wallpaper-0410-5697354-1.jpg')"}}></div>
      <div className={`flex-1 flex flex-col justify-center p-8 relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-opacity-20 bg-gray-600 hover:bg-opacity-30 transition-colors duration-200"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-4xl font-bold mb-2">Andritz AB</h1>
          <h2 className="text-2xl mb-1">Login</h2>
          <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Enter your credentials to access your account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;