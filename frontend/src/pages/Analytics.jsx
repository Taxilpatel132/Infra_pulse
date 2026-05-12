import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../api';

function Analytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock analytics or fetch from your analytics API route when implemented
    setData([
      { name: '10:00', uptime: 98, responseTime: 120, failures: 2 },
      { name: '11:00', uptime: 99, responseTime: 110, failures: 1 },
      { name: '12:00', uptime: 100, responseTime: 105, failures: 0 },
      { name: '13:00', uptime: 99, responseTime: 130, failures: 3 },
    ]);
  }, []);

  return (
    <div style={{ padding: '20px', height: '400px' }}>
      <h2>Analytics Charts</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uptime" stroke="#8884d8" name="Uptime %" />
          <Line type="monotone" dataKey="responseTime" stroke="#82ca9d" name="Response Time (ms)" />
          <Line type="monotone" dataKey="failures" stroke="#ff7300" name="Failures" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Analytics;