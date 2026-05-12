const analyticsService =
   require('../services/analyticsService');

const getServiceAnalytics = async (
   req,
   res
) => {

   try {

      const { id } = req.params;

      const analytics =
         await analyticsService
            .getServiceAnalytics(id);

      res.status(200).json(analytics);

   } catch(error) {

      console.log(error);

      res.status(500).json({
         message: 'Analytics failed'
      });

   }

};

module.exports = {
   getServiceAnalytics
};