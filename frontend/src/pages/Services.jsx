import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('api/services').then(res => setServices(res.data.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Services Dashboard</h2>
      <ul>
        {services.map(s => (
          <li key={s._id}>
            <strong>{s.name}</strong> ({s.status || 'UNKNOWN'}) | Response Time: {s.responseTime || 'N/A'}ms | Uptime: 99%
            {' - '}<Link to={`/logs/${s._id}`}>View Logs</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;