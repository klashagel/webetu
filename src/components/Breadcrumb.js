import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { isDarkMode } = useTheme();

  const linkClass = isDarkMode
    ? "text-blue-300 hover:text-blue-100"
    : "text-blue-600 hover:text-blue-800";

  const currentClass = isDarkMode
    ? "text-gray-300"
    : "text-gray-600";

  return (
    <nav aria-label="breadcrumb" className={`py-2 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <ol className="flex flex-wrap items-center space-x-2">
        <li>
          <Link to="/home" className={linkClass}>
            Etu
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name} className="flex items-center">
              <span className={`mx-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>/</span>
              {isLast ? (
                <span className={currentClass}>{name}</span>
              ) : (
                <Link to={routeTo} className={linkClass}>
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;