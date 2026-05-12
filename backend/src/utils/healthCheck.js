const axios = require('axios');

const checkHealth = async (url) => {
  const start = Date.now();

  try {
    const response = await axios.get(url);

    const responseTime = Date.now() - start;

    return {
      status: response.status < 500 ? 'UP' : 'DOWN',
      responseTime
    };

  } catch (error) {
    return {
      status: 'DOWN',
      responseTime: null
    };
  }
};

module.exports = checkHealth;