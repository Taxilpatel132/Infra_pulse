import React, { useEffect, useState } from 'react';
import api from '../api';

function Deployments() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    api.get('/deployments').then(res => setDeployments(res.data)).catch(console.error);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Deployment Dashboard</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Repo URL</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.status}</td>
              <td>{d.repoUrl}</td>
              <td>{new Date(d.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Deployments;