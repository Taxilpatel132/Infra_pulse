const { Worker } = require('bullmq');
const Redis = require('ioredis');
const path = require('path');
const Deployment = require('../models/Deployment');
const executeCommand =require('../utils/executeCommand');
const connection = new Redis(
   process.env.REDIS_URL,
   {
      maxRetriesPerRequest: null,
      tls: {}
   }
);

console.log('Deployment Worker Started');
const worker = new Worker(

   'deploymentQueue',

   async (job) => {

      try {

         const { deploymentId } = job.data;

         const deployment =
            await Deployment.findById(deploymentId);

         if (!deployment) return;

         console.log('Starting deployment...');

         deployment.status = 'BUILDING';
 await deployment.save();

         // project folder name
         const projectName =
            `project-${deployment._id}`;

         // absolute path
         const projectPath = path.join(
            __dirname,
            '../../deployments',
            projectName
         );

         deployment.projectPath = projectPath;

         await deployment.save();

         // clone github repo
         await executeCommand(
            `git clone ${deployment.repoUrl} ${projectPath}`
         );

         console.log('Repository cloned');
          // install dependencies
         await executeCommand(
            'npm install',
            projectPath
         );

         console.log('Dependencies installed');

         // build project
         const buildLogs = await executeCommand(
            'npm run build',
            projectPath
         );

         deployment.buildLogs = buildLogs;

         deployment.status = 'DEPLOYED';

         await deployment.save();

         console.log('Deployment completed');

      } catch(error) {

          deployment.status = 'FAILED';

   await deployment.save();

   console.log(error);
      }

   },

   { connection }

);