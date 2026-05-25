import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import api from '../api';

function DeploymentLogs() {
  const { id } = useParams();
  const [logs, setLogs] = useState('');
  const [status, setStatus] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    // Fetch initial static logs if already deployed
    api.get(`/deployments/${id}`).then(res => {
       if (res.data.buildLogs) {
          setLogs(res.data.buildLogs);
       }
       setStatus(res.data.status);
    }).catch(console.error);

    // Listen for live streamed logs
    const handleLog = (data) => {
      if (data.deploymentId === id) {
        setLogs(prev => prev + data.log);
        // auto-scroll
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }
    };

    const handleUpdate = (data) => {
      if (data.deploymentId === id) {
        setStatus(data.status);
      }
    };

    socket.on('deployment-log', handleLog);
    socket.on('deployment-update', handleUpdate);

    return () => {
      socket.off('deployment-log', handleLog);
      socket.off('deployment-update', handleUpdate);
    };
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Deployment Logs (Status: {status})</h2>
      <div 
        ref={terminalRef}
        style={{
          backgroundColor: '#1e1e1e',
          color: '#00ff00',
          padding: '15px',
          fontFamily: 'monospace',
          height: '400px',
          overflowY: 'auto',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap'
        }}
      >
        {logs || 'Waiting for logs...'}
      </div>
    </div>
  );
}

export default DeploymentLogs;