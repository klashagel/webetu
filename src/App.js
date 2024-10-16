import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import { ThemeProvider } from './contexts/ThemeContext';
import WebSocketProvider from './contexts/WebSocketProvider';
import ControllersDataProvider from './contexts/ControllersDataProvider';
import DbControllersDataProvider from './contexts/DbControlerDataProvider';
import Login from './pages/Login';
import Home from './pages/Home';
import Epic4Manual from './pages/Epic4Manual';
import Epic4Auto from './pages/Epic4Auto';
import Epic4Controller from './pages/Epic4Controller'; // Updated this line
import UnknownManual from './pages/UnknownManual';
import './styles/App.css';
import LuaCodeEditor from './pages/LuaCodeEditor';
import Epic4Firmware from './pages/Epic4Firmware';
import FatReport from './pages/FatReport';
import SerialAnalogDataProvider from './contexts/SerialAnalogDataProvider';
import './styles/global/GlobalButton.css';
import SerialDigitalDataProvider from './contexts/SerialDigitalDataProvider';
import { ToastContainer } from 'react-toastify';
import ConfigEditor from './pages/ConfigEditor';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';

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

const PageLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-grow overflow-auto">
      <Breadcrumb />
      {children}
    </div>
    <Footer />
  </div>
);

const App = () => {
  return (
    <ConfigProvider>
      <ThemeProvider>
        <Router>
          <ErrorBoundary>
            <WebSocketProvider>
              <DbControllersDataProvider>
              <ControllersDataProvider>
                <SerialAnalogDataProvider>
                  <SerialDigitalDataProvider>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/" element={<Navigate replace to="/login" />} />
                      <Route path="/home" element={<PageLayout><Home /></PageLayout>} />
                      <Route path="/Epic4Manual/:ip" element={<PageLayout><Epic4Manual /></PageLayout>} />
                      <Route path="/Epic4Firmware" element={<PageLayout><Epic4Firmware /></PageLayout>} />
                      <Route path="/Epic4Auto/:ip" element={<PageLayout><Epic4Auto /></PageLayout>} />
                      <Route path="/epic4/controller/:ip" element={<PageLayout><Epic4Controller /></PageLayout>} /> {/* Updated this line */}
                      <Route path="/UnknownManual/:ip" element={<PageLayout><UnknownManual /></PageLayout>} />
                      <Route path="/LuaCodeEditor" element={<PageLayout><LuaCodeEditor fileId="1" /></PageLayout>} />
                      <Route path="/ConfigEditor" element={<PageLayout><ConfigEditor /></PageLayout>} />
                      <Route path="/FatReport" element={<PageLayout><FatReport /></PageLayout>} />
                    </Routes>
                    <ToastContainer />
                  </SerialDigitalDataProvider>
                </SerialAnalogDataProvider>            
              </ControllersDataProvider>
              </DbControllersDataProvider>
            </WebSocketProvider>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;