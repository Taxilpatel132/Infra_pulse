const { exec } = require('child_process');

const executeCommand = (command, cwd = null) => {

   return new Promise((resolve, reject) => {

      exec(
         command,
         { cwd },
         (error, stdout, stderr) => {

            if (error) {
               reject(error);
            } else {
               resolve(stdout);
            }

         }
      );

   });

};

module.exports = executeCommand;