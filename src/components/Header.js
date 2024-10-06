import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1>EMP Pro</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/LuaCodeEditor">Code Editor</Link></li>
            <li><Link to="/Epic4Firmware">Firmware</Link></li>
            <li><Link to="/ConfigEditor">Settings</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;