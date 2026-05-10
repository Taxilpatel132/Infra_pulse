require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const server=require('http').createServer(app);
const startMonitoring = require('./jobs/monitorServices');
require('./workers/monitorWorker');

connectDB();
startMonitoring();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 