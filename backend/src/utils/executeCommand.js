const { spawn } = require('child_process');

const executeCommand = (command, cwd = null, onLog = null) => {

   return new Promise((resolve, reject) => {

      const child = spawn(command, { cwd, shell: true });
      let output = '';

      const handleData = (data) => {
         const text = data.toString();
         output += text;
         if (onLog) onLog(text);
      };

      child.stdout.on('data', handleData);
      child.stderr.on('data', handleData);

      child.on('close', (code) => {

         if (code === 0) {
            resolve(output);
         } else {
            reject(new Error(`Command failed with exit code ${code}\n${output}`));
         }

      });

      child.on('error', (error) => {
         reject(error);
      });

   });

};

module.exports = executeCommand;