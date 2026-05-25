const { Worker } = require('bullmq');
const Redis = require('ioredis');
const path = require('path');
const Deployment = require('../models/Deployment');
const executeCommand =require('../utils/executeCommand');
const { getIO } = require('../socket');
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

        

         deployment.status = 'BUILDING';
         console.log(`Deployment ${deployment._id} is building...`);
         getIO().emit(
       
   'deployment-update',

   {
      deploymentId: deployment._id,
      status: 'BUILDING'
   }

);
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

         const emitLog = (logText) => {
            getIO().emit('deployment-log', {
               deploymentId: deployment._id,
               log: logText
            });
         };

         emitLog(`\n> Cloning repository...\n`);
         console.log(`Cloning repo for deployment ${deployment._id}`);
         
         // clone github repo
         await executeCommand(
            `git clone ${deployment.repoUrl} ${projectPath}`,
            null,
            emitLog
         );

         emitLog(`\n> Installing dependencies...\n`);
         // install dependencies
         await executeCommand(
            'npm install',
            projectPath,
            emitLog
         );
         
         emitLog(`\n> Building project...\n`);
         // build project
         const buildLogs = await executeCommand(
            'npm run build',
            projectPath,
            emitLog
         );

         emitLog(`\n> Build Success & Deployment completed\n`);
         deployment.buildLogs = buildLogs;
   
        console.log(`Build completed for deployment ${deployment._id}`);
         deployment.status = 'DEPLOYED';
         getIO().emit(

   'deployment-update',

   {
      deploymentId: deployment._id,
      status: 'DEPLOYED'
   }
 
);
        
         await deployment.save();

      console.log(`Deployment ${deployment._id} is deployed successfully.`);
      } catch(error) {

          deployment.status = 'FAILED';
      getIO().emit(

   'deployment-update',

   {
      deploymentId: deployment._id,
      status: 'FAILED'
   }

);
   await deployment.save();

   console.log(error);
      }

   },

   { connection }

);