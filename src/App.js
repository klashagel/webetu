import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConfigProvider, useConfigContext } from './contexts/ConfigContext';
import WebSocketProvider from './contexts/WebSocketProvider';
import ControllersDataProvider from './contexts/ControllersDataProvider';
import Home from './pages/Home';
import Epic4Manual from './pages/Epic4Manual';
import Epic4Auto from './pages/Epic4Auto';
import Epic4Main from './pages/Epic4Main';
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
  return (
    <ConfigProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="app-content">
            <AppProviders />
          </div>
        </div>
        <Footer />
        <ErrorBoundary>
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </ConfigProvider>
  );
};

export default App;