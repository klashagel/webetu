import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import { ConfigProvider, useConfigContext } from './contexts/ConfigContext';
import WebSocketProvider from './contexts/WebSocketProvider';
import ControllersDataProvider from './contexts/ControllersDataProvider';
import Home from './pages/Home';
import Epic4Manual from './pages/Epic4Manual';
import Epic4Auto from './pages/Epic4Auto';
import Epic4Main from './pages/Epic4Main';
import UnknownManual from './pages/UnknownManual';
import LanguageSwitcher from './components/LanguageSwitcher';
import './styles/App.css';
import LuaCodeEditor from './pages/LuaCodeEditor';
import Epic4Firmware from './pages/Epic4Firmware';
import FatReport from './pages/FatReport';
import SerialAnalogDataProvider from './contexts/SerialAnalogDataProvider';
import './styles/global/GlobalButton.css';
import SerialDigitalDataProvider from './contexts/SerialDigitalDataProvider';
import { ToastContainer } from 'react-toastify';
import ConfigEditor from './pages/ConfigEditor';
import TestPrintReport from './pages/TestPrintReport';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const AppProviders = () => {
  const { websocketUrl, restUrl } = useConfigContext();

  if (!websocketUrl || !restUrl) {
    return <div>Error: Configuration missing URLs</div>;
  }

  return (
    <WebSocketProvider>
      <ControllersDataProvider>
        <SerialAnalogDataProvider>
          <SerialDigitalDataProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Epic4Manual/:ip" element={<Epic4Manual />} />
              <Route path="/Epic4Firmware" element={<Epic4Firmware />} />
              <Route path="/Epic4Auto/:ip" element={<Epic4Auto />} />
              <Route path="/Epic4Main/:ip" element={<Epic4Main />} />
              <Route path="/UnknownManual/:ip" element={<UnknownManual />} />
              <Route path="/LuaCodeEditor" element={<LuaCodeEditor fileId="1" />} />
              <Route path="/ConfigEditor" element={<ConfigEditor />} />
              <Route path="/FatReport" element={<FatReport />} />
            </Routes>
          </SerialDigitalDataProvider>
        </SerialAnalogDataProvider>
      </ControllersDataProvider>
    </WebSocketProvider>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <ConfigProvider>
      <Router>
        <div className="app-container">
          <header className="app-header no-print">
            <GiHamburgerMenu
              onClick={toggleSidebar}
              className="sidebar-toggle-icon"
              size={30}
            />
            <h1 className="app-title">EMP Pro</h1>
            <div className="header-right">
              <LanguageSwitcher />
            </div>
          </header>
          <Sidebar
            sidebar={
              <div className="sidebar-content no-print">
                <div className="sidebar-header">
                  <h2 className="sidebar-title">EMP Pro</h2>
                  <FaTimes className="sidebar-close-icon" onClick={closeSidebar} />
                </div>
                <div className="sidebar-body">
                  <ul className="sidebar-links">
                    <li><Link to="/" onClick={closeSidebar}>Home</Link></li>
                    <li><Link to="/LuaCodeEditor" onClick={closeSidebar}>Code Editor</Link></li>
                    <li><Link to="/Epic4Firmware" onClick={closeSidebar}>Firmware</Link></li>
                    <li><Link to="/ConfigEditor" onClick={closeSidebar}>Settings</Link></li> 

                  </ul>
                </div>
              </div>
            }
            open={sidebarOpen}
            onSetOpen={setSidebarOpen}
            styles={{
              sidebar: { background: 'white', width: 250, position: 'fixed', top: 0, left: 0, zIndex: 20 },
              overlay: { zIndex: 15 }
            }}
          >
            <div className="app-content">
              <AppProviders />
            </div>
          </Sidebar>
        </div>
        <ErrorBoundary>
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </ConfigProvider>
  );
};

export default App;