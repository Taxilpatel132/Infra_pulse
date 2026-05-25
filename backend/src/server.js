require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const server=require('http').createServer(app);
const startMonitoring = require('./jobs/monitorServices');
const { initSocket } = require('./socket');
require('./workers/monitorWorker');
require('./workers/deploymentWorker');
connectDB();
startMonitoring();
const PORT = process.env.PORT || 5000;
initSocket(server);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 