import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Services from './pages/Services';
import MonitoringLogs from './pages/MonitoringLogs';
import Deployments from './pages/Deployments';
import DeploymentLogs from './pages/DeploymentLogs';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#eee' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
        <Link to="/services" style={{ marginRight: '10px' }}>Services</Link>
        <Link to="/deployments" style={{ marginRight: '10px' }}>Deployments</Link>
        <Link to="/analytics">Analytics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/logs/:id" element={<MonitoringLogs />} />
        <Route path="/deployments" element={<Deployments />} />
        <Route path="/deployments/:id/logs" element={<DeploymentLogs />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;