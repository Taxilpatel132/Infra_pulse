import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function MonitoringLogs() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get(`api/services/${id}/logs`).then(res => setLogs(res.data)).catch(console.error);
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Monitoring Logs</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>
            Status: {log.status} | Time: {log.responseTime}ms | Checked At: {new Date(log.checkedAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MonitoringLogs;