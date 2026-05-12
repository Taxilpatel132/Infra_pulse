const MonitoringLog =
   require('../models/MonitoringLog');

const getServiceAnalytics = async (
   serviceId
) => {

   // get all logs for service
   const logs = await MonitoringLog.find({
      serviceId
   });

   // total checks
   const totalChecks = logs.length;

   // failed checks
   const failedChecks = logs.filter(
      log => log.status === 'DOWN'
   ).length;

   // successful checks
   const successfulChecks = logs.filter(
      log => log.status === 'UP'
   );

   // average response time
   const totalResponseTime =
      successfulChecks.reduce(

         (sum, log) =>
            sum + (log.responseTime || 0),

         0
      );

   const averageResponseTime =
      successfulChecks.length > 0

      ? Math.floor(
         totalResponseTime /
         successfulChecks.length
      )

      : 0;

   // uptime percentage
   const uptimePercentage =
      totalChecks > 0

      ? (
         (
            successfulChecks.length /
            totalChecks
         ) * 100
      ).toFixed(2)

      : 0;

   return {

      totalChecks,

      failedChecks,

      averageResponseTime,

      uptimePercentage

   };

};

module.exports = {
   getServiceAnalytics
};