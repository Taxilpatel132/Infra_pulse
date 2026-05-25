import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import socket from '../socket';
function Deployments() {
  const [deployments, setDeployments] = useState([]);
 
  useEffect(() => {
    api.get('/deployments').then(res => setDeployments(res.data)).catch(console.error);
  }, []);
useEffect(() => {
  //  console.log('Setting up socket listener for deployment updates');
   socket.on(

      'deployment-update',

      (data) => {

         console.log(
            'Live Update:',
            data
         );
    
         setDeployments((prev) =>
              
            prev.map((deployment) =>

               deployment.id ===
data.deploymentId

               ? {

                    ...deployment,

                    status: data.status

                 }

               : deployment

            )

         );

      }

   );

   return () => {

      socket.off(
         'deployment-update'
      );

   };

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
            <th>Logs</th>
          </tr>
        </thead>
        <tbody>
          {deployments.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.status}</td>
              <td>{d.repoUrl}</td>
              <td>{new Date(d.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`/deployments/${d.id}/logs`}>View Logs</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Deployments;